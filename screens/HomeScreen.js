import React, { Component } from "react";
import axios from "axios";

import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Modal
} from "react-native";

import HeaderUser from '../components/headerUser';
import Colors from "../constants/Colors";
import ImageZoom from '../components/imageZoom';

import { Video } from "expo"
var { width } = Dimensions.get('window');

class HomeScreen extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        ...this.props.navigation.state.params,
        dataUser: [],
        userImgData: [],
        modalVisible: false,
        dataForModal: "",
        linkForModal: "",
        isMuted: true
    }

    async getUser() {
        const response = await axios.get(`https://api.imgur.com/3/account/${this.state.user}`, { headers: { 'Authorization': `Client-ID ${this.state.client_id}` } })
        try {
            this.setState({
                dataUser: response.data.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    async getUserImg() {
        const response = await axios.get(`https://api.imgur.com/3/account/me/images`, {
            headers: { 'Authorization': `Bearer ${this.state.access_token}` }
        })
        try {
            this.setState({
                userImgData: response.data.data,
                imgCounter: response.data.data.length
            })
        } catch (error) {
            console.log(error);
        }
    }

    setModalVisible(visible, data = "", link = "") {
        this.setState({
            modalVisible: visible,
            dataForModal: data,
            linkForModal: link
        })
    }

    favImage(id) {
        axios.post(`https://api.imgur.com/3/image/${id}/favorite`, {},
            { headers: { 'Authorization': `Bearer ${this.state.access_token}` } });
    }

    async componentDidMount() {
        await this.getUser();
        await this.getUserImg();
    }

    renderModal() {
        return (
            <ImageZoom link={this.state.linkForModal} data={this.state.dataForModal} isFavo={false} setModalVisible={this.setModalVisible} />
        )
    }

    renderMosaic() {
        var table = [];
        for (var i = 0; i < this.state.imgCounter; i++) {
            var count = i;
            if (i == 0) {
                count = 1;
            }
            table.push(<View key={i} style={{ flex: 1, flexDirection: 'row' }}>
                {this.state.userImgData.slice(i, 3 * count).map((data, index) => {
                    if (data.link.slice(-4) == ".mp4") {
                        return (
                            <View key={index + i}>
                                <TouchableOpacity onPress={() => this.setModalVisible(true, data, data.link)}>
                                    <Video style={{ width: (width / 3), height: (width / 3) }} rate={1.0} isMuted={this.state.isMuted} isLooping shouldPlay source={{ uri: data.link }} />
                                </TouchableOpacity>
                            </View>
                        )
                    } else {
                        return (
                            <View key={index + i}>
                                <TouchableOpacity onPress={() => this.setModalVisible(true, data, data.link)}>
                                    <Image style={{ width: (width) / 3, height: (width) / 3 }} source={{ uri: data.link }} />
                                </TouchableOpacity>
                            </View>
                        )
                    }
                })}
            </View>)
            i++;
            i++;
        }

        return table;
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderUser user={this.state.user} access_token={this.state.access_token} />
                <ScrollView>
                    {this.renderMosaic()}
                </ScrollView>
                <Modal animationType="slide" transparent={false} visible={this.state.modalVisible} onRequestClose={() => { }}>
                    {this.renderModal()}
                </Modal>
            </View>
        );
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.tintBackColor
    },
});