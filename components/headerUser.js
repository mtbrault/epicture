import React from 'react'
import axios from "axios";

import {
    View,
    StyleSheet,
    ImageBackground,
    Image,
    Text,
    AsyncStorage
} from "react-native";

class HeaderUser extends React.PureComponent {
    constructor(props) {
        super(props)
    }
    state = {
        dataUser: [],
    }
    async getUser() {
        const response = await axios.get(`https://api.imgur.com/3/account/${this.state.user}`, {
            headers: {
                'Authorization': `Client-ID ${this.state.access_token}`
            }
        })
        try {
            this.setState({
                dataUser: response.data.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    async componentDidMount() {
        this.setState({
            user: await AsyncStorage.getItem('userName'),
            access_token: await AsyncStorage.getItem('accessToken')    
        })
        await this.getUser();
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={{ uri: this.state.dataUser.cover }} style={styles.backgroundUser}>
                    <View style={styles.inImage}>
                        <Image source={{ uri: this.state.dataUser.avatar }} style={styles.avatar}></Image>
                        <Text style={styles.textFont}>{this.state.user}</Text>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

export default HeaderUser;

const styles = StyleSheet.create({
    container: {
        paddingTop: 24
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
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 5,
    },
    avatar: {
        borderRadius: 35, width: 70, height: 70,
        borderWidth: 1
    }
});