import React, { Component } from "react";

import {
    View,
    StyleSheet,
    Text
} from "react-native";

class FavoritesScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>FavoritesScreen</Text>
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