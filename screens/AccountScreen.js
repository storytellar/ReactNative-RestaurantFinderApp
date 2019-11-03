import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const AccountScreen = (props) => {
  return (
    <View>
      <Text>AccountScreen</Text>
      <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
        <Text>Click me to log out</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
        <Text>Click me to signup</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountScreen;
