import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import IconUser from "../assets/svg/user.svg";

const windowWidth = Dimensions.get("window").width;

const Comment = props => {
  const { name, comment } = props;
  return (
    <View style={{ marginBottom: 20 }}>
      <View
        style={{
          alignItems: "center",
          width: "100%",
          flexDirection: "row"
        }}
      >
        <IconUser width={31} height={31} />
        <Text style={{ fontSize: 18, fontWeight: "500", paddingLeft: 5, color: '#181D2E' }}>
          {name}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "300",
          paddingLeft: 5,
          paddingTop: 5,
          color: '#181D2E'
        }}
      >
       {comment}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Comment;
