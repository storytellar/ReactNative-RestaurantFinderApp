import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import RecommendScreen from '../screens/RecommendScreen';
import SearchScreen from '../screens/SearchScreen';
import DetailScreen from '../screens/DetailScreen.js';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

//#region RecommendScreen
const RecommendStack = createStackNavigator(
  {
    Recommend: RecommendScreen,
    Detail: {
      screen: DetailScreen,
      navigationOptions: { tabBarVisible: false }
    },
  },
  config
);



RecommendStack.navigationOptions = ({ navigation }) => {
  // get active route from navigation
  const activeRoute = navigation.state.routes[navigation.state.index].routeName;

  if (activeRoute === 'Detail') {
    return { tabBarVisible: false }
  }

  return {
    tabBarLabel: 'Today',
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
  }
};

RecommendStack.path = '';
//#endregion

//#region SearchScreen
const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
    Detail: DetailScreen
  },
  config
);

SearchStack.navigationOptions = ({ navigation }) => {
  // get active route from navigation
  const activeRoute = navigation.state.routes[navigation.state.index].routeName;

  if (activeRoute === 'Detail') {
    return { tabBarVisible: false }
  }
  return {
    tabBarLabel: 'Search',
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
  }
};

SearchStack.path = '';

//#region HIDE BOTTOM TAB BAR
// RecommendStack.navigationOptions.tabBarVisible = false;

const tabNavigator = createBottomTabNavigator({
  RecommendStack,
  SearchStack,
},
  {
    initialRouteName: 'RecommendStack',
  }
);

tabNavigator.path = '';

export default tabNavigator;
