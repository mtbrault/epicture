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

import { Video, Constants } from "expo";

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
        linkForModal: ""
    }

    async getUserFav() {
        const response = await axios.get(`https://api.imgur.com/3/account/${this.state.user}/favorites`,
            { headers: { 'Authorization': `Bearer ${this.state.access_token}` } });
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
            table.push(<View key={i} style={{ flex: 1, flexDirection: 'row' }}>
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
                                    <Video style={{ width: (width / 3), height: (width / 3) }} rate={1.0} isMuted={true} isLooping shouldPlay source={{ uri: link }} />
                                </TouchableOpacity>
                            </View>
                        )
                    } else {
                        return (
                            <View key={index + i}>
                                <TouchableOpacity onPress={() => this.setModalVisible(true, data, link)}>
                                    <Image style={{ width: (width / 3), height: (width / 3) }} source={{ uri: link }} />
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

    renderModal() {

        return (
            // <View>
            //     <Text style={{color: 'white', textAlign: 'center'}}>Titre : {this.state.dataForModal.title}</Text>
                <Image style={{
                    borderWidth: 1,
                    borderColor: 'black',
                    flex: 1,
                    alignSelf: 'stretch'
                }} source={{ uri: this.state.linkForModal }} />
            //     {/* <Text>Nb vues : {this.state.dataForModal.views}</Text>
            //     <Text>Nb points : {this.state.dataForModal.points}</Text>
            // </View> */}
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
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: Constants.statusBarHeight, backgroundColor: Colors.tintBackColor}}>
                        <TouchableOpacity onPress={() => this.setModalVisible(false)}>
                            <Text>Clique ici pour quitter. Ce serait cool de mettre un icone croix</Text>
                        </TouchableOpacity>
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