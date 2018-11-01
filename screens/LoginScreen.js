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

class LoginScreen extends Component {
    state = {
        result: null,
    };

    render() {
        return (
            <ImageBackground source={bgImage} style={styles.backgroundContainer}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('HomeScreen')}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={btnButton} />
                    </View>
                </TouchableOpacity>
            </ImageBackground>
        );
    }

    _handlePressButtonAsync = async () => {
        let result = await WebBrowser.openAuthSessionAsync('https://api.imgur.com/oauth2/authorize?client_id=63fe1ea47e0a5ab&response_type=token');
        this.setState({ result });
        console.log(this.state.result);
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