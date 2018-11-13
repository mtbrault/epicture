import React, { Component } from 'react';
import axios from 'axios';
import HeaderPage from '../components/headerPage';
import Colors from '../constants/Colors';
import { View, StyleSheet, Image, Dimensions, ScrollView, Modal, TouchableOpacity, AsyncStorage, RefreshControl } from 'react-native';
import ImageZoom from '../components/imageZoom';

import { Video } from 'expo';
var { width } = Dimensions.get('window');

class FavoritesScreen extends Component {
    constructor(props) {
        super(props)
        this.setModalVisible = this.setModalVisible.bind(this)
    }

    state = {
        user: null,
        access_token: null,
        modalVisible: false,
        dataForModal: '',
        linkForModal: '',
        idForModal: '',
        isMuted: true,
        refreshing: false
    }

    async getUserFav() {
        const response = await axios.get(`https://api.imgur.com/3/account/${this.state.user}/favorites`,
            {
                headers: {
                    'Authorization': `Bearer ${this.state.access_token}`
                }
            });
        try {
            this.setState({
                userImgData: response.data.data,
                imgCounter: response.data.data.length
            })
        } catch (error) {
            console.log(error);
        }
    }

    setModalVisible(visible, data = '', link = '', id = '') {
        this.setState({
            modalVisible: visible,
            dataForModal: data,
            linkForModal: link,
            idForModal: id
        })
        this.componentDidMount();
    }


    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.componentDidMount().then(() => {
            this.setState({ refreshing: false });
        });
    }

    async componentDidMount() {
        this.setState({
            user: await AsyncStorage.getItem('userName'),
            access_token: await AsyncStorage.getItem('accessToken')
        })
        await this.getUserFav();
    }

    renderMosaic() {
        let table = [];
        for (var i = 0; i < this.state.imgCounter; i++) {
            var count = i;
            if (i == 0)
                count = 1;
            table.push(<View key={i} style={{ flex: 1, flexDirection: 'row' }}>
                {this.state.userImgData.slice(i, 3 * count).map((data, index) => {
                    let link = '';
                    let id = '';
                    if (data.images) {
                        link = data.images[0].link;
                        id = data.images[0].id;
                    } else {
                        link = data.link;
                        id = data.id;
                    }
                    if (link.slice(-4) == '.mp4') {
                        return (
                            <View key={index + i}>
                                <TouchableOpacity onPress={() => this.setModalVisible(true, data, link, id)}>
                                    <Video style={{ width: (width / 3), height: (width / 3) }}
                                        rate={1.0}
                                        isMuted={true}
                                        isLooping
                                        shouldPlay
                                        source={{ uri: link }} />
                                </TouchableOpacity>
                            </View>
                        )
                    } else {
                        return (
                            <View key={index + i}>
                                <TouchableOpacity onPress={() => this.setModalVisible(true, data, link, id)}>
                                    <Image style={{ width: (width / 3), height: (width / 3) }} source={{ uri: link }} />
                                </TouchableOpacity>
                            </View>
                        )
                    }
                })}
            </View>)
            i += 2;
        }
        return table;
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderPage user={this.state.user}
                    page={"Favorite Page"}
                    access_token={this.state.access_token} />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }>
                    {this.renderMosaic()}
                </ScrollView>
                <Modal animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                    }}>
                    <ImageZoom link={this.state.linkForModal}
                        data={this.state.dataForModal}
                        id={this.state.idForModal}
                        setModalVisible={this.setModalVisible} />
                </Modal>
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
