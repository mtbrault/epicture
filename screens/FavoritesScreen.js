import React, { Component } from "react";
import axios from "axios";
import {
    View,
    StyleSheet,
    Text
} from "react-native";


class FavoritesScreen extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        user: "ValerianHuylebroeck",
        access_token: "0c35ca712ea8b032084682a37e6d28ca594012c3",
        userFavData: []
    }
    async getUserFav() {
        const response = await axios.get(`https://api.imgur.com/3/account/${this.state.user}/favorites`,
        {headers: { 'Authorization': `Bearer ${this.state.access_token}`}});
        try {
            this.setState({
                userFavData: response.data.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    async componentDidMount() {
        //await this.getUserFav();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>My favorite</Text>
            </View>
        );
    }
}

export default FavoritesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
});