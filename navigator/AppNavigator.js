import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';

import HomeScreenPage from '../screens/HomeScreen';
import LoginScreenPage from '../screens/LoginScreen';
import SettingsScreenPage from '../screens/SettingsScreen';

const HomeScreenStack = createStackNavigator(
    {
        HomeScreen: HomeScreenPage,
    },
    {
        headerMode: 'none'
    }
)

const LoginScreenStack = createStackNavigator(
    {
        LoginScreen: LoginScreenPage,
    },
    {
        headerMode: 'none'
    }
)

const SettingsScreenStack = createStackNavigator(
    {
        SettingsScreen: SettingsScreenPage,
    },{
        headerMode: 'none'
    }
)

const Tab = createBottomTabNavigator(
    {
        HomeScreen: {
            screen: HomeScreenStack,
        },
        SettingsScreen: {
            screen: SettingsScreenStack
        }
    }
)

const SwitchNav = createSwitchNavigator(
    {
        LoginScreen: {
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
      initialRouteName: 'LoginScreen',
    }
)

export default SwitchNav;