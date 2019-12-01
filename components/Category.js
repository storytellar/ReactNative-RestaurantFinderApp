import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import IconBeer from "../assets/svg/beer.svg";
import IconCoffee from "../assets/svg/concern_coffee.svg";
import IconBuffet from "../assets/svg/concern_buffet.svg";
import IconBakery from "../assets/svg/concern_cookie.svg";
import IconAffordable from "../assets/svg/concern_affordable.svg";
import IconVegetarian from "../assets/svg/concern_vegetarian.svg";
import IconOther from "../assets/svg/concern_other.svg";

const Category = props => {
  const { name, onPressButton, id } = props;
  
  return (
    <View>
      <View style={styles.categoryItem}>
        <TouchableOpacity onPress={onPressButton}>
          <View style={styles.circle}>
            {
              (id==1) ? 
              <IconCoffee width={30} height={30}/>
              :
              (id==2) ? 
              <IconBakery width={30} height={30}/>
              :
              (id==3) ? 
              <IconBuffet width={30} height={30}/>
              :
              (id==4) ? 
              <IconAffordable width={30} height={30}/>
              :
              (id==5) ? 
              <IconVegetarian width={30} height={30}/>
              :
              (id==6) ? 
              <IconOther width={30} height={30}/>
              :
              <IconCoffee width={30} height={30}/>
            }
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
    fontSize: 15,
    textAlign: 'center',
    color: "#3C3D47"
  }
});

export default Category;
