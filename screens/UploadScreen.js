import React, { Component } from 'react';
import axios from 'axios';
import { View, StyleSheet, TouchableOpacity, Text, Image,
} from 'react-native';

import { ImagePicker } from 'expo';

import HeaderPage from '../components/headerPage';
import Colors from '../constants/Colors';

class UploadScreen extends Component {
  constructor( props ) {
    super( props );
  }
  state = {
    user: 'zackmat',
    access_token: 'c513b70b97c5abd633860b8e732a590d9fab3078',
    imageSource: null
  }

  _uploadImg = async () => {
    let imageSourceGet = await ImagePicker.launchImageLibraryAsync( {
      base64: true,
      allowsEditing: false,
      aspect: [ 4, 3 ],
    } );

    this.setState( {
      imageSource: imageSourceGet,
    } );

    axios.post( 'https://api.imgur.com/3/image', {
      image: this.state.imageSource.base64,
    }, {
      headers: {
        'Authorization': `Bearer ${this.state.access_token}`,
      }
    } ).then( response => console.log( response ) ).catch( error => console.log( error ) )
  };

  render() {
    return (
    <View style={ styles.container }>
      <HeaderPage user={ this.state.user }
                  page={ "Upload Page" }
                  access_token={ this.state.access_token } />
      <TouchableOpacity onPress={ this._uploadImg }>
        <View style={ { alignItems: 'center', justifyContent: 'center', padding: 4, backgroundColor: '#1bb76e', borderRadius: 5 } }>
          <Text>
            UPLOAD IMAGE
          </Text>
        </View>
      </TouchableOpacity>
    </View>
    );
  }
}

export default UploadScreen;

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: Colors.tintBackColor
  },
} );
