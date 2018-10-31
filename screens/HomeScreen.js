import React, { Component } from "react";

import {
    View,
    StyleSheet,
    Text
} from "react-native";

class HomeScreen extends Component {

    render() {

        return (
            <View style={styles.container}>
                 <Text>qsdqssq</Text>
            </View>
            );
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'darkgray',
        justifyContent: 'center',
        alignItems: 'center',
    },
});