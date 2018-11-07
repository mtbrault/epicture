import React, { Component } from "react";
import axios from "axios";
import HeaderPage from '../components/headerPage';
import Colors from '../constants/Colors';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
    Modal,
    TouchableOpacity
} from "react-native";
import { Video }from "expo";
import Icon2 from 'react-native-vector-icons/Entypo'
import Octicons from 'react-native-vector-icons/Octicons'

var { width } = Dimensions.get('window');
class FavoritesScreen extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        user: "zackmat",
        access_token: "c513b70b97c5abd633860b8e732a590d9fab3078",
        modalVisible: false,
        dataForModal: "",
        linkForModal: "",
        isMuted: true
    }
    async getUserFav() {
        const response = await axios.get(`https://api.imgur.com/3/account/${this.state.user}/favorites`,
        {headers: { 'Authorization': `Bearer ${this.state.access_token}`}});
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

    async componentDidMount() {
        await this.getUserFav();
    }

    renderMosaic() {
        let table = [];
        for (var i = 0; i < this.state.imgCounter; i++) {
            var count = i;
            if (i == 0)
                count = 1;
            table.push(<View key={i} style={{flex: 1, flexDirection: 'row'}}>
                {this.state.userImgData.slice(i, 3 * count).map((data, index) => {
                    let link = "";
                    if (data.images)
                        link = data.images[0].link;
                    else
                        link = data.link;
                    if (link.slice(-4) == ".mp4") {
                        return (
                            <View key={index + i}>
                                <TouchableOpacity onPress={() => this.setModalVisible(true, data, link)}>
                                    <Video style={{ width: (width / 3), height: (width / 3)}} rate={1.0} isMuted={true} isLooping shouldPlay source= {{uri: link }} />
                                </TouchableOpacity>
                            </View>
                        )
                    } else {
                        return (
                            <View key={index + i}>
                                <TouchableOpacity onPress={() => this.setModalVisible(true, data, link)}>
                                    <Image style={{ width: (width / 3), height: (width / 3)}} source= {{uri: link }} />
                                </TouchableOpacity>
                            </View>
                        )
                    }
                })}
            </View>)
            i += 2;
        }
        return table;
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
                        <Octicons name="mute" size={25}/>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View>
                    <TouchableOpacity onPress={() => this.setMute(true)}>
                        <Octicons name="unmute" size={25}/>
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
                    <Video style={{ width: (width / 3), height: (width / 3)}} rate={1.0} isMuted={!this.state.isMuted} isLooping shouldPlay source= {{uri: link }} />
                </View>
            )
        } else {
            return (
                <View>
                    <Image style={{width: (width / 2), height: (width / 2)}} source={{uri: link}} />
                </View>
            )
        }
    }

    unfav(id) {
        axios.post(`https://api.imgur.com/3/image/${id}/favorite`, {},
        {headers: { 'Authorization': `Bearer ${this.state.access_token}`}});
    }

    renderModal() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.setModalVisible(false)}>
                    <Icon2 name="cross" size={25} style={{marginLeft: 350}} />
                </TouchableOpacity>
                <Text>Titre : {this.state.dataForModal.title}</Text>
                {this.renderLinkContent(this.state.linkForModal)}
                <Text>Nb vues : {this.state.dataForModal.views}</Text>
                <Text>Nb points : {this.state.dataForModal.points}</Text>
                <TouchableOpacity onPress={() => this.unfav(this.state.dataForModal.id)}>
                    <Text>Supprimer des favoris</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
        <View style={styles.container}>
            <HeaderPage user={this.state.user} page={"Favorite Page"} access_token={this.state.access_token} />
            <ScrollView>
                {this.renderMosaic()}
            </ScrollView>
            <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}>
                <View style={{marginTop: 100}}>
                    {this.renderModal()}
                </View>
            </Modal>
        </View>
        );
    }
}

export default FavoritesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.tintBackColor
    },
});