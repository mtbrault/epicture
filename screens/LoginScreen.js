import React, { Component } from 'react';

import { View, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';

import bgImage from '../assets/Login/background.jpg';
import btnButton from '../assets/Login/btnLogin.png';

class LoginScreen extends Component {
  constructor( props ) {
    super( props )
  }

  render() {
    return (
    <ImageBackground source={ bgImage } style={ styles.backgroundContainer }>
      <TouchableOpacity onPress={ () => this.props.navigation.navigate( 'ImgurWebView' ) }>
        <View style={ { alignItems: 'center', justifyContent: 'center' } }>
          <Image source={ btnButton } />
        </View>
      </TouchableOpacity>
    </ImageBackground>
    );
  }

}

export default LoginScreen;

const styles = StyleSheet.create( {
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  }
} );
