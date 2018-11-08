import React, { Component } from "react";
import axios from "axios";

import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Text,
    Modal
} from "react-native";

import HeaderUser from '../components/headerUser';
import Colors from "../constants/Colors";
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Entypo'
import Octicons from 'react-native-vector-icons/Octicons'
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

    setMute(value) {
        this.setState({
            isMuted: value
        })
    }

    renderIcon() {
        if (this.state.isMuted == true) {
            return (
                <View>
                    <TouchableOpacity onPress={() => this.setMute(false)}>
                        <Octicons name="mute" size={25} />
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View>
                    <TouchableOpacity onPress={() => this.setMute(true)}>
                        <Octicons name="unmute" size={25} />
                    </TouchableOpacity>
                </View>
            )
        }
    }

    renderLinkContent(link) {
        if (link.slice(-4) == ".mp4") {
            return (
                <View>
                    {this.renderIcon()}
                    <Video style={{ width: (width / 3), height: (width / 3) }} rate={1.0} isMuted={!this.state.isMuted} isLooping shouldPlay source={{ uri: link }} />
                </View>
            )
        } else {
            return (
                <View>
                    <Image style={{ width: (width / 2), height: (width / 2) }} source={{ uri: link }} />
                </View>
            )
        }
    }

    renderModal() {
        return (
            <View style={{ marginTop: 100 }}>
                <TouchableOpacity onPress={() => this.setModalVisible(false)}>
                    <Icon2 name="cross" size={25} style={{ marginLeft: 350 }} />
                </TouchableOpacity>
                <Text>Titre : {this.state.dataForModal.title}</Text>
                {this.renderLinkContent(this.state.linkForModal)}
                <Text>Nb vues : {this.state.dataForModal.views}</Text>
                <Text>Nb points : {this.state.dataForModal.points}</Text>
                <TouchableOpacity onPress={() => this.favImage(this.state.dataForModal.id)} >
                    <Text>Cliquer ici pour mettre en favori</Text>
                </TouchableOpacity>
            </View>
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
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { }}
                >
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