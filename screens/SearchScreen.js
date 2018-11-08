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
    Dimensions,
    Picker,
    Modal,
    TouchableOpacity
} from "react-native";


import Icon from 'react-native-vector-icons/AntDesign'
import ClientID from '../constants/apiInfo';
import Colors from '../constants/Colors';
import HeaderPage from '../components/headerPage';
import {Video} from "expo"
import Icon2 from 'react-native-vector-icons/Entypo'
import Octicons from 'react-native-vector-icons/Octicons'

var { width } = Dimensions.get('window');

class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "zackmat",
            access_token: "c513b70b97c5abd633860b8e732a590d9fab3078",
            curText: '',
            images: [],
            imgCounter: 0,
            filterTime: 'top',
            filterHot: 'time',
            modalVisible: false,
            dataForModal: "",
            linkForModal: "",
            isMuted: true
        }
        this.searchText = this.searchText.bind(this);
        this.updateText = this.updateText.bind(this);
        this.execSearch = this.execSearch.bind(this);
        this.updateFilterHot = this.updateFilterHot.bind(this);
    }

    componentWillMount() {
        this.startHeaderHeight = 80
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 50 + StatusBar.currentHeight
        }
    }

    searchText() {
        axios.get(`https://api.imgur.com/3/gallery/search/${this.state.filterHot}/month/1?q=` + this.state.curText,
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

    updateFilterHot(value, index) {
        this.setState({
            filterHot: value
        })
        this.execSearch();
    }

    setModalVisible(visible, data = "", link = "") {
        console.log(data);
        this.setState({
            modalVisible: visible,
            dataForModal: data,
            linkForModal: link
        })
    }

    setMute(value) {
        this.setState({
            isMuted: value
        })
    }

    renderIcon() {
        if (this.state.isMuted == true) {
            return (
                <View>
                    <TouchableOpacity onPress={() => this.setMute(false)}>
                        <Octicons name="mute" size={25}/>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View>
                    <TouchableOpacity onPress={() => this.setMute(true)}>
                        <Octicons name="unmute" size={25}/>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    renderMosaic() {
        var table = [];

        for (var i = 0; i < 30; i++) {
            var count = i;
            if (i == 0) {
                count = 1;
            }
            table.push(<View key={i} style={{ flex: 1, flexDirection: 'row' }}>
                {this.state.images.slice(i, 3 * count).map((data, index) => {
                    if (data && data.link.length > 2) {
                        if (data.link.split(-4) != ".mp4") {
                            return (
                                <View key={index + i}>
                                    <TouchableOpacity onPress={() => this.setModalVisible(true, data, data.link)}>
                                        <Image style={{ width: (width) / 3, height: (width) / 3 }} source={{ uri: data.link }} />
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                        else {
                            return (
                                <View key={index + i}>
                                    <TouchableOpacity onPress={() => this.setModalVisible(true, data, data.link)}>
                                        <Video style={{ width: (width / 3), height: (width / 3)}} rate={1.0} isMuted={true} isLooping shouldPlay source= {{uri: data.link }} />
                                    </TouchableOpacity>
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

    renderLinkContent(link) {
        if (link.slice(-4) == ".mp4") {
            return (
                <View>
                    {this.renderIcon()}
                    <Video style={{ width: (width / 3), height: (width / 3)}} rate={1.0} isMuted={!this.state.isMuted} isLooping shouldPlay source= {{uri: link }} />
                </View>
            )
        } else {
            return (
                <View>
                    <Image style={{width: (width / 2), height: (width / 2)}} source={{uri: link}} />
                </View>
            )
        }
    }

    renderModal() {
        return (
            <View style={{marginTop: 100}}>
                <TouchableOpacity onPress={() => this.setModalVisible(false)}>
                    <Icon2 name="cross" size={25} style={{marginLeft: 350}}/>
                </TouchableOpacity>
                <Text>Titre : {this.state.dataForModal.title}</Text>
                {this.renderLinkContent(this.state.linkForModal)}
                <Text>Nb vues : {this.state.dataForModal.views}</Text>
                <Text>Nb points : {this.state.dataForModal.points}</Text>
                <TouchableOpacity onPress={() => this.favImage(this.state.dataForModal.id)} >
                    <Text>Cliquer ici pour mettre en favori</Text>
                </TouchableOpacity>
            </View>
        )
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
                <View style={styles.footerBar}>
                    <Picker
                        style={{ width: '100%' }}
                        itemStyle={{color: 'white', fontWeight: 'bold', fontSize: 15}}
                        selectedValue={this.state.filterHot}
                        onValueChange={this.updateFilterHot}
                    >
                        <Picker.Item label="Sort by Time" value="time" />
                        <Picker.Item label="Sort by Viral" value="viral" />
                        <Picker.Item label="Sort by Top" value="top" />
                    </Picker>
                </View>
                <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {}}
                >
                    {this.renderModal()}
                </Modal>
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
    footerBar: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        elevation: 5,
        borderTopWidth: 0,
        borderTopColor: 'black',
        borderTopWidth: 1,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        backgroundColor: Colors.tintFooter
    },
});