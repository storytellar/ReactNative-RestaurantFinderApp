import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import IconBeer from "../assets/svg/beer.svg";

const Category = props => {
  const { name, onPressButton } = props;
  return (
    <View>
      <View style={styles.categoryItem}>
        <TouchableOpacity onPress={onPressButton}>
          <View style={styles.circle}>
            <IconBeer width={23} height={27} fill={"#3C3D47"} />
          </View>
        </TouchableOpacity>
        <Text style={styles.text}>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    height: 85,
    width: 56,
    alignItems: "center",
    justifyContent: "space-between"
  },
  circle: {
    height: 56,
    width: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#D6D6D6",
    backgroundColor: "white"
  },
  text: {
    fontSize: 16,
    color: "#3C3D47"
  }
});

export default Category;
