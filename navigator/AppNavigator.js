import React from 'react';

import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';

import Icon from 'react-native-vector-icons/AntDesign'

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SearchScreen from '../screens/SearchScreen';
import UploadScreen from '../screens/UploadScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ImgurWebView from '../screens/ImgurWebView';

const LoginScreenStack = createStackNavigator(
    {
        LoginScreen: LoginScreen,
    },
    {
        headerMode: 'none'
    }
)

const ImgurWebViewStack = createStackNavigator(
    {
        ImgurWebView: ImgurWebView,
    },
    {
        headerMode: 'none'
    }
)

const Tab = createBottomTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="home" color={tintColor} size={24} />
            )
        }
    },
    Upload: {
        screen: UploadScreen,
        navigationOptions: {
            tabBarLabel: 'Upload',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="upload" color={tintColor} size={24} />
            )
        }
    },
    Search: {
        screen: SearchScreen,
        navigationOptions: {
            tabBarLabel: 'Search',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="search1" color={tintColor} size={24} />
            )
        }
    },
    Favorites: {
        screen: FavoritesScreen,
        navigationOptions: {
            tabBarLabel: 'Favorites',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="staro" color={tintColor} size={24} />
            )
        }
    }
},{
    tabBarOptions: {
      activeTintColor: Colors.tintColor,
      inactiveTintColor: '#b3b4b8',
      labelStyle: {
        fontSize: 10,
      },
      style: {
        backgroundColor: '#222327',
        borderTopWidth: 0,
        borderTopColor: 'black',
        borderTopWidth: 1,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
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
        ImgurWebView: {
            screen: ImgurWebViewStack,
            navigationOptions: {
                tabBarLabel: 'WebView Page'
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

export default SwitchNav;