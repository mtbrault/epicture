import React from 'react';
import { createStackNavigator } from 'react-navigation';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

export default class App extends React.Component {
  render() {
    return (
        <AppNavigator />
    );
  }
}

const AppNavigator = createStackNavigator ({
  Login: LoginScreen,
  Home: HomeScreen
}, {
  headerMode: 'none',
})

