import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";

import IconShop from "../assets/svg/shop.svg";
import IconHeart from "../assets/svg/heart.svg";
import IconStar from "../assets/svg/star.svg";

const windowWidth = Dimensions.get("window").width;

const Shop = props => {
  var { vote, shop, isLove, price, image, onPressItem, distance, onPressLove } = props;

  if (parseInt(vote) > 1 && parseInt(vote) <= 5)
    var votes = [...Array(parseInt(vote) - 1).keys()];
  else if (parseInt(vote) > 5) var votes = [...Array(4).keys()];
  else var votes = [...Array(0).keys()];

  return (
    <View style={styles.border}>
      <TouchableOpacity onPress={onPressItem}>
        <View style={styles.container}>
          <View style={styles.mainInfo}>
            <View style={styles.itemPhoto}>
              <Image style={styles.image} source={image} />
            </View>
            <View style={styles.midInfo}>
              <View style={styles.itemShop}>
                <IconShop width={25} height={22} fill={"#3C3D46"} />
                <Text style={styles.itemTitle}>{" " + shop}</Text>
              </View>
              <View style={styles.itemVote}>
                <View style={{ flexDirection: "row" , alignItems: 'center'}}>
                  <View >
                    <IconStar width={14} height={14} />
                  </View>
                  {votes.map(vote => {
                    return (
                      <View key={vote}>
                        <IconStar width={14} height={14} />
                      </View>
                    );
                  })}
                  <Text style={{ paddingLeft: 5, fontSize: 14 }}>{vote}</Text>
                </View>
              </View>
              <View style={styles.itemShop}>
                <Text style={styles.shopName}>{`About ${distance} km`}</Text>
              </View>
            </View>
          </View>
          <View style={styles.rightInfo}>
            <TouchableOpacity onPress={onPressLove}>
              <IconHeart
                width={25}
                height={22}
                fill={isLove ? "#F66767" : "#B9B9B9"}
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.price}>{price}k</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

function roundHalf(num) {
  return Math.round(num * 2) / 2;
}

const styles = StyleSheet.create({
  border: {
    marginVertical: 10,
    width: (9.5384615385 * windowWidth) / 12,
    height: 100,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 8,

    backgroundColor: "white"
  },
  container: {
    // backgroundColor: 'red',
    width: (8.9615384615 * windowWidth) / 12,
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  mainInfo: {
    flexDirection: "row",
    alignItems: "center"
  },
  midInfo: {
    // backgroundColor: 'red',
    paddingLeft: 10
  },
  itemTitle: {
    fontSize: (0.6923076923 * windowWidth) / 17,
    fontWeight: "bold",
    color: "#3C3D47"
  },
  itemVote: {
    paddingLeft: 3,
    paddingVertical: 4
  },
  itemShop: {
    flexDirection: "row",
    alignItems: "flex-end"
  },
  shopName: {
    paddingLeft: 3,
    fontSize: (0.5384615385 * windowWidth) / 17,
    color: "#8B8B8B"
  },
  itemPhoto: {
    width: 80,
    height: 80
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 8
  },
  rightInfo: {
    height: 70,
    justifyContent: "space-between"
  },
  price: {
    fontSize: 14,
    color: "#CF9331"
  }
});

export default Shop;
