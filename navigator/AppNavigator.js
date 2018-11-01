import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';

import { Platform } from 'react-native';
import TabBarIcon from '../components/TabBarIcon';

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

HomeScreenStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
            ? `ios-information-circle${focused ? '' : '-outline'}`
            : 'md-information-circle'
        }
      />
    ),
  };

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

SettingsScreenStack.navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
      />
    ),
  };
  

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