import React from 'react';

import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';

import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SearchScreen from '../screens/SearchScreen';
import UploadScreen from '../screens/UploadScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const LoginScreenStack = createStackNavigator(
    {
        LoginScreen: LoginScreen,
    },
    {
        headerMode: 'none'
    }
)

const Tab = createBottomTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: 'HOME',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="th-large" color={tintColor} size={24} />
            )
        }
    },
    Upload: {
        screen: UploadScreen,
        navigationOptions: {
            tabBarLabel: 'UPLOAD',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="upload" color={tintColor} size={24} />
            )
        }
    },
    Search: {
        screen: SearchScreen,
        navigationOptions: {
            tabBarLabel: 'SEARCH',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="search" color={tintColor} size={24} />
            )
        }
    },
    Favorites: {
        screen: FavoritesScreen,
        navigationOptions: {
            tabBarLabel: 'FAVORITES',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="star" color={tintColor} size={24} />
            )
        }
    },
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {
            tabBarLabel: 'PROFILE',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="user" color={tintColor} size={24} />
            )
        }
    }
},{
    tabBarOptions: {
      activeTintColor: Colors.tintColor,
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5
      }
    }
  })

const SwitchNav = createSwitchNavigator(
    {
        Login: {
            screen: LoginScreenStack,
            navigationOptions: {
                tabBarLabel: 'Login Page'
            }
        },
        TabEpicture: {
            screen: Tab,
            navigationOptions: {
                tabBarLabel: 'TabList Page'
            }
        },
    },
    {
        initialRouteName: 'Login',
    }
)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  

export default SwitchNav;