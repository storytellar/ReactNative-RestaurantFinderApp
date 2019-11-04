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
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Text>{userData.name}</Text>
      <TouchableOpacity
        onPress={async () => {
          await logout();
          props.navigation.navigate("Login");
        }}
      >
        <Text style={{fontSize: 20, color: '#69E384', padding: 20, borderRadius: 10, backgroundColor: '#FADD79'}}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountScreen;
