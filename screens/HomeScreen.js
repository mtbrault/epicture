import React, { Component } from "react";
import axios from "axios";

import {
    View,
    ScrollView,
    StyleSheet,
    ImageBackground,
    Image,
    Text,
    Dimensions
} from "react-native";

var { height, width } = Dimensions.get('window');

class HomeScreen extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        ...this.props.navigation.state.params,
        dataUser: [],
        userImgData: []

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
                userImgData: response.data.data
            })
        } catch (error) {
            console.log(error);
        }
    }


    async componentDidMount() {
        await this.getUser();
        await this.getUserImg();
        console.log(this.state.dataUser.avatar);
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <ImageBackground source={{ uri: this.state.dataUser.cover }} style={styles.backgroundUser}>
                        <View style={styles.inImage}>
                            <Image source={{ uri: this.state.dataUser.avatar }} style={styles.avatar}></Image>
                            <Text style={styles.textFont}>{this.state.user}</Text>
                        </View>
                    </ImageBackground>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        {this.state.userImgData.map((data, index) => {
                            return (<View key={index}>
                                <Image style={{ width: (width) / 3, height: (width) / 3 }} source={{ uri: data.link }} />
                            </View>)
                        })}
                    </View>
                </View>

            </View>
        );
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 24
    },
    containerSecond: {
        flex: 2,
        backgroundColor: 'gray',
    },
    textFont: {
        fontWeight: 'bold',
        color: '#fff'
    },
    inImage: {
        alignItems: 'center',
        marginTop: 15
    },
    backgroundUser: {
        height: 130,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        borderRadius: 35, width: 70, height: 70,
        borderWidth: 1
    }
});