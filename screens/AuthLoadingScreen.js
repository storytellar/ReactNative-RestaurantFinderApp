import React from "react";
import { View } from "react-native";
import { getData } from "../controllers/account.controller";

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }
  
  
  _bootstrapAsync = async () => {
    loginData = await getData();
    this.props.navigation.navigate(loginData ? "Recommend" : "Login");
    // Quick develop Front-end
    // this.props.navigation.navigate("Detail");
  };

  render() {
    return (
      <View>
      </View>
    );
  }
}

export default AuthLoadingScreen;
