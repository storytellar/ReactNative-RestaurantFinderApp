import React from "react";
import { Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

const Banner = (props) => {
    const {img, onPressBanner} = props
  return (
    <TouchableOpacity style={styles.bigPhotoWrapper} onPress={onPressBanner}>
      <Image
        style={styles.bigPhoto}
        source={img}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bigPhotoWrapper: {
    paddingVertical: 10,
    paddingLeft: 10,
    shadowColor: "#333",
    shadowOffset: {
      width: -4,
      height: 3
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,

    elevation: 10
  },
  bigPhoto: {
    width: (9.5 * windowWidth) / 12,
    height: 180,
    resizeMode: "cover",
    borderRadius: 30,
    borderColor: "#979797",
    borderWidth: 1
  }
});

export default Banner;
