import React, { Component } from "react";
import axios from 'axios';

import {
    View,
    StyleSheet,
    TextInput,
    Platform,
    StatusBar,
    Text,
    ScrollView,
    Image,
    Dimensions
} from "react-native";

import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/AntDesign'
import ClientID from '../constants/apiInfo';
import Colors from '../constants/Colors';
import HeaderPage from '../components/headerPage';

var { width } = Dimensions.get('window');

class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "zackmat",
            access_token: "c513b70b97c5abd633860b8e732a590d9fab3078",
            curText: '',
            images: [],
            imgCounter: 0
        }
        this.searchText = this.searchText.bind(this);
        this.updateText = this.updateText.bind(this);
        this.execSearch = this.execSearch.bind(this);
    }

    componentWillMount() {
        this.startHeaderHeight = 80
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 50 + StatusBar.currentHeight
        }
    }

    searchText() {
        axios.get('https://api.imgur.com/3/gallery/search/time/month/1?q=' + this.state.curText,
            {
                headers: { 'Authorization': `Client-ID ${ClientID.clientID}` }
            }).then(imgData => {
                this.setState({
                    images: [].concat(...imgData.data.data.map(
                        dataImg => dataImg.images
                    ))
                })
                this.setState({
                    imgCounter: this.state.images.length
                })
            });

    }

    updateText(event) {
        this.setState({
            curText: event.nativeEvent.text
        })
    }

    execSearch() {
        this.searchText();
        this.render(this.renderSecondPart());
    }

    renderMosaic() {
        var table = [];

        for (var i = 0 ; i < 30 ; i++) {
            var count = i;
            if (i == 0) {
                count = 1;
            }
            table.push(<View key={i} style={{ flex: 1, flexDirection: 'row' }}>
                {this.state.images.slice(i, 3 * count).map((data, index) => {
                    if (data && data.link.length > 2) {
                        let extension = data.link.split('.').pop();
                        if (extension == "jpg" || extension == "gif") {
                            return (
                                <View key={index + i}>
                                    <Image style={{ width: (width) / 3, height: (width) / 3 }} source={{ uri: data.link }} />
                                </View>
                            )
                        }

                    }
                })}
            </View>)

            i++;
            i++;
        }

        return table;

    }

    renderSecondPart() {

        if (this.state.imgCounter != 0) {
            return (
                <ScrollView>
                    {this.renderMosaic()}
                </ScrollView>
            )
        } else {
            return (
                <View style={{ alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ paddingTop: 10, fontWeight: 'bold', color: 'white', fontSize: 40 }}>No result.</Text>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderPage user={this.state.user} page={"Search Page"} access_token={this.state.access_token} />
                <View style={{ height: this.startHeaderHeight, borderBottomWidth: 1 }}>
                    <View style={{
                        flexDirection: 'row', padding: 10,
                        marginHorizontal: 20,
                        backgroundColor: Colors.tintFooter,
                        shadowOffset: { width: 0, height: 0 },
                        shadowColor: 'black',
                        shadowOpacity: 0.2,
                        elevation: 5,
                        borderWidth: 1,
                        borderColor: 'black',
                        marginTop: Platform.OS == 'android' ? 10 : null
                    }}>
                        <Icon name="search1" size={25} style={{ marginRight: 10, color: 'white' }} />
                        <TextInput
                            underlineColorAndroid="transparent"
                            placeholder="Try your search (Sorted by: viral)"
                            placeholderTextColor={Colors.tintUnselected}
                            onEndEditing={this.execSearch}
                            onChange={this.updateText}
                            style={{ flex: 1, fontWeight: '700', color: 'white', backgroundColor: Colors.tintFooter }}
                        />
                    </View>
                </View>
                {this.renderSecondPart()}
            </View>
        );
    }
}

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.tintBackColor
    },
});