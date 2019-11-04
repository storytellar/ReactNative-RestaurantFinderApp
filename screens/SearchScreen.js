import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { withNavigationFocus } from "react-navigation";

import IconSearch from "../assets/svg/search.svg";

const windowWidth = Dimensions.get("window").width;

const SearchScreen = props => {
  const [value, onChangeText] = React.useState("");

  const getKeyword = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        await onChangeText(value);
        await AsyncStorage.removeItem(key);
      }
    } catch (error) {}
  };

  if (props.isFocused) {
    getKeyword("@keyword");
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Everythings that you need!</Text>
        <View style={styles.searchBoxWrapper}>
          <TextInput
            style={styles.input}
            placeholder="The coffee house..."
            onChangeText={text => onChangeText(text)}
            value={value}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => alert("keyword: " + value)}
          >
            <IconSearch width={32} height={32} fill={"white"} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

SearchScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFCFA"
  },
  headerText: {
    marginTop: 30,
    fontSize: 26,
    fontWeight: "bold",
    color: "#E9895D",
    width: 256,
    letterSpacing: 2.69
  },
  searchBoxWrapper: {
    width: 0.82 * windowWidth,
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    height: 60,
    borderColor: "gray",
    borderRadius: 18,
    backgroundColor: "white",
    paddingLeft: 15,

    justifyContent: "space-between",

    shadowColor: "#D8BCA8",
    shadowOffset: {
      width: -2,
      height: 4
    },
    shadowOpacity: 10,
    shadowRadius: 10,

    elevation: 7
  },
  input: {
    width: 0.82 * windowWidth - 90,
    fontSize: 18,
    fontWeight: "400",
    color: "#3C3D47"
  },
  searchButton: {
    backgroundColor: "#E9895D",
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginRight: 5
  }
});

export default withNavigationFocus(SearchScreen);
