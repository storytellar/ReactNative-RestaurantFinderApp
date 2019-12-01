import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  ActivityIndicator
} from "react-native";
import { withNavigationFocus } from "react-navigation";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import {
  getListRecommendStore,
  getListStoreByKeyword
} from "../controllers/store.controller";
import Shop from "../components/Shop";

import IconSearch from "../assets/svg/search.svg";

const windowWidth = Dimensions.get("window").width;

const SearchScreen = props => {
  const [location, setLocation] = React.useState({ latitude: 0, longitude: 0 });
  const [errorLocation, setErrorLocation] = React.useState("");
  const [value, onChangeText] = React.useState("");
  const [isFood, setOption] = React.useState(true);

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      setErrorLocation("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
  };

  const _storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {}
  };

  const searchShops = async keyword => {
    props.navigation.navigate("Searching", {
      keyword: keyword,
      location: location,
      searchType: isFood ? 1 : 2
    });
  };

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

  React.useEffect(() => {
    _getLocationAsync();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Everything that you need!</Text>
        <View style={styles.searchBoxWrapper}>
          <TextInput
            style={styles.input}
            placeholder="The coffee house..."
            onChangeText={text => onChangeText(text)}
            value={value}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => searchShops(value)}
          >
            <IconSearch width={32} height={32} fill={"white"} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 5 }}></View>

      <View style={{ width: windowWidth * 0.82, flexDirection: "row" }}>
        <TouchableOpacity
          style={isFood ? styles.concernSelected : styles.concern}
          onPress={() => setOption(true)}
        >
          <Text style={isFood ? { color: "white" } : { color: "#DC8D66" }}>
            FOOD
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={!isFood ? styles.concernSelected : styles.concern}
          onPress={() => setOption(false)}
        >
          <Text style={!isFood ? { color: "white" } : { color: "#DC8D66" }}>
            STORE
          </Text>
        </TouchableOpacity>
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
  },
  concern: {
    margin: 3,
    width: windowWidth * 0.2,
    paddingVertical: 10,
    // backgroundColor: "#357376",
    borderWidth: 1,
    borderColor: "#DC8D66",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  concernSelected: {
    margin: 3,
    width: windowWidth * 0.2,
    paddingVertical: 10,
    backgroundColor: "#DC8D66",
    borderWidth: 1,
    borderColor: "#DC8D66",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default withNavigationFocus(SearchScreen);
