import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBar from "../components/TabBar";

import RecommendScreen from "../screens/RecommendScreen";
import SearchScreen from "../screens/SearchScreen";
import DetailScreen from "../screens/DetailScreen.js";
import AccountScreen from "../screens/AccountScreen.js";
import EditInfoAccountScreen from "../screens/EditInfoAccountScreen.js";
import FavoriteScreen from "../screens/FavoriteScreen.js";
import ConcernScreen from "../screens/ConcernScreen.js";
import SearchResultScreen from "../screens/SearchResultScreen.js";

import IconHome from "../assets/svg/home.svg";
import IconSearch from "../assets/svg/search.svg";
import IconUser from "../assets/svg/user.svg";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

//#region RecommendScreen
const RecommendStack = createStackNavigator(
  {
    Recommend: RecommendScreen,
    Detail: DetailScreen
  },
  config
);

RecommendStack.navigationOptions = ({ navigation }) => {
  // get active route from navigation
  const activeRoute = navigation.state.routes[navigation.state.index].routeName;
  if (activeRoute === "Detail") {
    return { tabBarVisible: false };
  }
  return {
    tabBarLabel: "Today",
    tabBarIcon: ({ focused }) => (
      <IconHome height={focused ? 31 : 44} width={focused ? 31 : 44} fill={focused ? "#FFF" : "#C5C5C5"} />
    )
  };
};

RecommendStack.path = "";
//#endregion

//#region SearchScreen
const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
    Searching: SearchResultScreen
  },
  config
);

SearchStack.navigationOptions = ({ navigation }) => {
  // get active route from navigation
  const activeRoute = navigation.state.routes[navigation.state.index].routeName;
  if (activeRoute === "Detail") {
    return { tabBarVisible: false };
  }
  return {
    tabBarLabel: "Search",
    tabBarIcon: ({ focused }) => (
      <IconSearch height={31} width={31} fill={focused ? "#FFF" : "#C5C5C5"} />
    )
  };
};

SearchStack.path = "";
//#endregion

//#region AcountScreen
const AccountStack = createStackNavigator(
  {
    Account: AccountScreen,
    EditInfo: EditInfoAccountScreen,
    Favorite: FavoriteScreen,
    Concern: ConcernScreen,
  },
  config
);

AccountStack.navigationOptions =  {
    tabBarLabel: "Me",
    tabBarIcon: ({ focused }) => (
      <IconUser height={31} width={31}  />
    )
};

AccountStack.path = "";
//#endregion


const tabNavigator = createBottomTabNavigator(
  {
    SearchStack,
    RecommendStack,
    AccountStack
  },
  {
    initialRouteName: "RecommendStack",
    tabBarComponent: TabBar
  }
);

tabNavigator.path = "";

export default tabNavigator;
