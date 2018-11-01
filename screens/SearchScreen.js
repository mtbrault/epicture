import React, { Component } from "react";

import {
    View,
    StyleSheet,
    TextInput,
    Text,
    TouchableOpacity
} from "react-native";

class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    _searchData() {
        console.log("Je recherche avec " + this.state.text);
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput  style={{height: 40, width: 200, alignItems: 'center', justifyContent: 'center'}}
                            placeholder="Images, #tags, @users oh my!"
                            onChangeText={(text) => this.setState({text})} />
                <TouchableOpacity onPress={this._searchData}>
                        <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
});