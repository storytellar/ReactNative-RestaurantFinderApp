import React from "react";
import { View } from "react-native";
import { getLocalData } from "../controllers/account.controller";

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }
  
  _bootstrapAsync = async () => {
    loginData = await getLocalData();
    // this.props.navigation.navigate("Concern");
    this.props.navigation.navigate(loginData ? "Recommend" : "Login");
    // Quick develop Front-end
    // this.props.navigation.navigate("Detail", { storeID: "1017932899811403512" });
    // this.props.navigation.navigate("Concern");
  };

  render() {
    return (
      <View>
      </View>
    );
  }
}

export default AuthLoadingScreen;
