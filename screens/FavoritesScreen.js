import React, { Component } from "react";
import axios from "axios";
import HeaderPage from '../components/headerPage';
import Colors from '../constants/Colors';
import {
    View,
    StyleSheet,
    Image,
    Dimensions
} from "react-native";

var { width } = Dimensions.get('window');
class FavoritesScreen extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        user: "zackmat",
        access_token: "c513b70b97c5abd633860b8e732a590d9fab3078",
        userFavData: []
    }
    async getUserFav() {
        const response = await axios.get(`https://api.imgur.com/3/account/${this.state.user}/favorites`,
        {headers: { 'Authorization': `Bearer ${this.state.access_token}`}});
        try {
            console.log(response)
            this.setState({
                userFavData: response.data.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    async componentDidMount() {
        await this.getUserFav();
    }

    render() {
        return (
        <View style={styles.container}>
            <HeaderPage user={this.state.user} page={"Favorite Page"} access_token={this.state.access_token} />
            <View style={{flex: 1, flexDirection: 'row'}}>
                {this.state.userFavData.map((data, index) => {
                    return (<View key={index}>
                        <Image style={{width: (width / 3), height: (width / 3)}} source ={{uri: data.link}} />
                    </View>)
                })}
            </View>
        </View>
        );
    }
}

export default FavoritesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.tintBackColor
    },
});