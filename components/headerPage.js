import React from 'react'
import axios from "axios";

import {
    View,
    StyleSheet,
    ImageBackground,
    Text,
    AsyncStorage
} from "react-native";

class HeaderPage extends React.PureComponent {
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
                    <View style={styles.textBox}>
                        <Text style={styles.textFont}>{this.props.page}</Text>
                    </View>
                </ImageBackground>
            </View >
        )
    } end
}

export default HeaderPage;

const styles = StyleSheet.create({
    container: {
        paddingTop: 24
    },
    textFont: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 30
    },
    textBox: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    backgroundUser: {
        height: 80,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 5,
    }
});