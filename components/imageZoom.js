import React from 'react'
import axios from 'axios';
import { Text, Dimensions, View, Image, StyleSheet, AsyncStorage
} from 'react-native';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/AntDesign';
import AudioIcon from 'react-native-vector-icons/Octicons'

import { Video } from 'expo';
class ImageZoom extends React.PureComponent {
  constructor( props ) {
    super( props )
    this.state = {
      access_token: null,
      favoriteSet: false,
      isMuted: true
    }
    this.setFavorite = this.setFavorite.bind( this );
    this.setMuted = this.setMuted.bind( this );
    if ( !this.props.data.points ) {
      this.props.data.points = 0;
    }
  }

  async componentDidMount() {
    if ( this.props.data.favorite == true || (this.props.data.images && this.propos.data.images[0].favorite == true)) {
      this.setState( {
        favoriteSet: true
      } )
    }
    this.setState({
        access_token: await AsyncStorage.getItem('accessToken')
    })
  }

  setFavAPI( id ) {
    axios.post( `https://api.imgur.com/3/image/${id}/favorite`, {},
      {
        headers: {
          'Authorization': `Bearer ${this.state.access_token}`
        }
      } );
  }

  setFavorite() {
      this.setState( {
          favoriteSet: !this.state.favoriteSet
      })
      this.setFavAPI( this.props.id );
  }

  setMuted() {
    if ( this.state.isMuted ) {
      this.setState( {
        isMuted: false
      } )
    } else {
      this.setState( {
        isMuted: true
      } )
    }
  }

  renderLinkContent( link ) {
    if ( link.slice( -4 ) == '.mp4' ) {
      return (
      <Video style={ styles.imageZoomStyle }
             rate={ 1.0 }
             isMuted={ this.state.isMuted }
             isLooping
             shouldPlay
             source={ { uri: link } } />
      )
    } else {
      return (
      <Image style={ styles.imageZoomStyle } source={ { uri: link } } />
      )
    }
  }

  render() {
    return (
    <View style={ styles.container }>
      { this.renderLinkContent( this.props.link ) }
      <View style={ { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginHorizontal: 15, alignItems: 'flex-start' } }>
        <View style={ { alignItems: 'center', margin: 10 } }>
          <Text style={ styles.textFirst} >
              {this.props.data.account_url}
          </Text>
        </View>
        <View style={ { alignItems: 'center', margin: 10 } }>
          <Text style={ styles.textFirst }>
            Views
          </Text>
          <Text style={ styles.textScore }>
            { this.props.data.views }
          </Text>
        </View>
        <View style={ { alignItems: 'center', margin: 10 } }>
          <Text style={ styles.textFirst }>
            Likes
          </Text>
          <Text style={ styles.textScore }>
            { this.props.data.points }
          </Text>
        </View>
        { this.props.link.slice( -4 ) == '.mp4' && (this.props.data.has_sound == true || (this.props.data.images && this.props.data.images[0].has_sound == true)) && <AudioIcon name={ this.state.isMuted ? 'mute' : 'unmute' }
                                                              size={ 30 }
                                                              style={ { color: 'white', alignItems: 'flex-end', margin: 8 } }
                                                              onPress={ this.setMuted } /> }
        <Icon name={ this.state.favoriteSet ? 'star' : 'staro' }
              size={ 30 }
              style={ { color: 'white', alignItems: 'flex-end', margin: 8 } }
              onPress={ this.setFavorite } />
      </View>
      <View style={ { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 10, marginTop: 20 } }>
        <Icon name="close"
              size={ 30 }
              style={ { color: 'white' } }
              onPress={ () => this.props.setModalVisible( false ) } />
      </View>
    </View>
    )
  }
}

export default ImageZoom;

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.tintBackColor,
  },
  textFirst: {
    color: 'white',
    fontSize: 15
  },
  textScore: {
    color: 'white',
    fontSize: 8,
  },
  footerBar: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    elevation: 5,
    borderTopWidth: 0,
    borderTopColor: 'black',
    borderTopWidth: 1,
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowColor: 'black',
    shadowOpacity: 1,
    backgroundColor: Colors.tintFooter
  },
  imageZoomStyle: {
    padding: 50,
    width: Dimensions.get( 'window' ).width,
    height: Dimensions.get( 'window' ).height - 200
  }
} )
