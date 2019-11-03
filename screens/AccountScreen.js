import React from "react";
import { View, Text, TouchableOpacity,  } from "react-native";

import { logout, getData } from "../controllers/account.controller";

const AccountScreen = props => {
  const [userData, setUserData] = React.useState('');

  React.useEffect(() => {
    getdatadata();
  },[]);

  const getdatadata = async () => {
    var data = await getData();
    setUserData(JSON.parse(data));
    console.log(userData);
  }
  return (
    <View>
      <Text>AccountScreen</Text>
      <Text>TêN: {userData.name}</Text>
      <TouchableOpacity
        onPress={async () => {
          await logout();
          props.navigation.navigate("Login");
        }}
      >
        <Text>Click me to log out</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
        <Text>Click me to signup</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountScreen;
