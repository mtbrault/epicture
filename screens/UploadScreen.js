import React, { Component } from 'react';
import axios from 'axios';
import {
  View, StyleSheet, TouchableOpacity, Text, AsyncStorage
} from 'react-native';

import { ImagePicker } from 'expo';

import HeaderPage from '../components/headerPage';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/AntDesign'

class UploadScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    user: null,
    access_token: null,
    imageSource: null,
    imgUploaded: false,
    data: null
  }

  async componentDidMount() {
    this.setState({
      user: await AsyncStorage.getItem('userName'),
      access_token: await AsyncStorage.getItem('accessToken')
    })
  }

  _uploadImg = async () => {
    let imageSourceGet = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: false,
      aspect: [4, 3],
    });

    this.setState({
      imageSource: imageSourceGet,
    });

    axios.post('https://api.imgur.com/3/image', {
      image: this.state.imageSource.base64,
    }, {
        headers: {
          'Authorization': `Bearer ${this.state.access_token}`,
        }
      }).then(response => 
        this.setState({
        imgUploaded: true,
        data: response
      })
      
      ).catch(error => console.log(error))
  };

  componentDidMount() {
    if (this.state.imgUploaded) {
      setTimeout(() => {
        this.setState({ imgUploaded: false });
      }, 200);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderPage user={this.state.user}
          page={"Upload Page"}
          access_token={this.state.access_token} />
        <TouchableOpacity onPress={this._uploadImg}>
          <View style={{ alignItems: 'center', justifyContent: 'center', padding: 4, marginTop: 20 }}>
            <Icon name="upload"
              size={70}
              style={{ marginRight: 10, color: 'white' }} />
            <Text style={{ alignContent: 'center', justifyContent: 'center', fontSize: 30, fontWeight: 'bold', color: 'white' }} >
              UPLOAD IMAGE
          </Text>
          </View>
        </TouchableOpacity>
        {this.state.imgUploaded == true && <Text style={{ alignContent: 'center', marginTop: 20, fontWeight: 'bold', color: Colors.tintColor }}>Image uploaded successfully.</Text>}
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
