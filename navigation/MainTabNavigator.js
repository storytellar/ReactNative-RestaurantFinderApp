import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBar from '../components/TabBar'

import RecommendScreen from '../screens/RecommendScreen';
import SearchScreen from '../screens/SearchScreen';
import DetailScreen from '../screens/DetailScreen.js';

import IconHome from '../assets/svg/home.svg'
import IconSearch from '../assets/svg/search.svg'

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
      <IconHome
        height={31}
        width={31}
        fill={focused ? '#FFF' : '#C5C5C5'}
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
      <IconSearch
        height={31}
        width={31}
        fill={focused ? '#FFF' : '#C5C5C5'}
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
    tabBarComponent: TabBar,
  }
);

tabNavigator.path = '';

export default tabNavigator;
