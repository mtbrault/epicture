import React, { Component } from 'react';

import { View, WebView, AsyncStorage} from 'react-native';

import apiInfo from '../constants/apiInfo'

class ImgurWebView extends Component {
  constructor( props ) {
    super( props )
  }

  render() {
    return (
    <View style={ { flex: 1 } }>
      <WebView source={ { uri: `https://api.imgur.com/oauth2/authorize?client_id=${apiInfo.clientID}&response_type=token` } }
               startInLoadingState={ true }
               javaScriptEnabled={ true }
               domStorageEnabled={ true }
               automaticallyAdjustContentInsets={ false }
               style={ { marginTop: 20 } }
               onNavigationStateChange={ this._onNavigationStateChange.bind( this ) } />
    </View>
    );
  }

  _onNavigationStateChange = async ( webViewState ) => {
    if ( webViewState.url.startsWith( 'https://zacktrololol.io' ) ) {
      const regex = 'access_token=([^&]+)(?:&expires=(.*))?';
      let accessToken = webViewState.url.match( regex )[ 1 ];
      const regexName = 'account_username=([^&]+)(?:&account_id=(.*))?';
      let userName = webViewState.url.match( regexName )[ 1 ];
      await AsyncStorage.setItem( 'accessToken', accessToken );
      await AsyncStorage.setItem( 'userName', userName );
      this.props.navigation.navigate( 'Home' );
    }
  }


}

export default ImgurWebView;
