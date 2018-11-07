import React, { Component } from "react";

import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground,
} from "react-native";

import bgImage from '../assets/Login/background.jpg';
import btnButton from '../assets/Login/btnLogin.png';
import { WebBrowser } from 'expo';
import apiInfo from "../constants/apiInfo"

class LoginScreen extends Component {
    state = {
        user: 'zackmat',
        access_token: 'c513b70b97c5abd633860b8e732a590d9fab3078',
        client_id: apiInfo.clientID
    };

    render() {
        return (
            <ImageBackground source={bgImage} style={styles.backgroundContainer}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Home', {user: this.state.user, access_token: this.state.access_token, client_id: this.state.client_id})}>
                {/* <TouchableOpacity onPress={this._handlePressButtonAsync}> */}
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={btnButton} />
                    </View>
                </TouchableOpacity>
            </ImageBackground>
        );
    }

    _handlePressButtonAsync = async () => {
        let result = await WebBrowser.openAuthSessionAsync(`https://api.imgur.com/oauth2/authorize?client_id=${this.state.client_id}&response_type=token`);
        console.log(result);
    };
}

export default LoginScreen;

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoCenter: {
        alignItems: 'center',
    }
});