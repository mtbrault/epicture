import React, { Component } from "react";

import {
    View,
    StyleSheet
} from "react-native";

import HeaderUser from '../components/headerUser';
import Colors from "../constants/Colors";

class UploadScreen extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        user: "zackmat",
        access_token: "c513b70b97c5abd633860b8e732a590d9fab3078"
    }
    render() {
        return (
            <View style={styles.container}>
                <HeaderUser user={this.state.user} access_token={this.state.access_token} />
            </View>
        );
    }
}

export default UploadScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.tintBackColor
    },
});