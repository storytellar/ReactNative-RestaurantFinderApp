import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    AuthLoading: AuthLoadingScreen,
    Login: LoginScreen,
    Main: MainTabNavigator,
    SignUp: SignupScreen,
    // Detail: DetailsScreen,
  },
  {
    initialRouteName: 'AuthLoading',
  })
);
