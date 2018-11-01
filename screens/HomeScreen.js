import React, { Component } from "react";
import axios from "axios";

import {
    View,
    StyleSheet,
    Text
} from "react-native";

class HomeScreen extends Component {
    searchPicture() {
        axios.get('https://api.imgur.com/3/gallery/top',{headers: {'Authorization': 'Client-ID 63fe1ea47e0a5ab'}})
         .then(response => {
            console.log(response.data)
         }).catch(err => {
            console.log(err);
         });
    }

    componentDidMount() {
        this.searchPicture();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>HomeScreen</Text>
            </View>
        );
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
});