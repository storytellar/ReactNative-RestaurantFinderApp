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

import {
  getListStoreByKeyword,
  getListFoodByKeyword
} from "../controllers/store.controller";
import Shop from "../components/Shop";
import ItemDetail from "../components/ItemDetail";

import IconSearch from "../assets/svg/search.svg";

const windowWidth = Dimensions.get("window").width;

const SearchingShopListScreen = props => {
  const goDetail = storeID => {
    props.navigation.navigate("Detail", { storeID, location });
  };

  const [location, setLocation] = React.useState({ latitude: 0, longitude: 0 });
  const [errorLocation, setErrorLocation] = React.useState("");
  const [shops, setShops] = React.useState([]);
  const [foods, setFoods] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [hasErrored, setHasApiError] = React.useState(false);
  const [lastPageReached, setLastPageReached] = React.useState(false);
  const [value, onChangeText] = React.useState("");

  const searchShops = async keyword => {
    setLoading(true);
    await _getLocationAsync();
    newShopList = await getListStoreByKeyword(
      keyword,
      1,
      location.longitude,
      location.latitude,
      props
    );
    const hasMoreShop = newShopList.length > 0;
    setShops(shops.concat(newShopList));
    setLoading(false);
  };

  const searchFoods = async keyword => {
    setLoading(true);
    await _getLocationAsync();
    newFoodList = await getListFoodByKeyword(
      keyword,
      1,
      location.longitude,
      location.latitude,
      props
    );
    const hasMoreFood = newFoodList.length > 0;
    setFoods(foods.concat(newFoodList));
    setLoading(false);
  };

  React.useEffect(() => {
    let keyword = props.navigation.getParam("keyword");
    let searchType = props.navigation.getParam("searchType");
    if (searchType === 1) {
      searchFoods(keyword);
    } else {
      searchShops(keyword);
    }
  }, []);
  React.useEffect(() => {
    const b = props.navigation.getParam("location");
    setLocation(b);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* <Text style={styles.headerText}>Everythings that you need!</Text> */}
        <View style={styles.searchBoxWrapper}>
          <TouchableOpacity
            style={[styles.searchButton, { flexDirection: "row" }]}
            onPress={() => props.navigation.goBack()}
          >
            <IconSearch width={32} height={32} fill={"white"} />
            <Text style={{ fontSize: 18, color: "white" }}> Go back</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ height: 10 }}></View>
      {props.navigation.getParam("searchType") === 1 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          data={foods}
          onEndReached={searchFoods}
          onEndReachedThreshold={1}
          ListFooterComponent={
            !lastPageReached ? (
              <Text style={{ textAlign: "center" }}></Text>
            ) : (
              <ActivityIndicator size="large" loading={loading} />
            )
          }
          renderItem={({ item }) => (
            <ItemDetail
              title={item.title}
              vote={item.vote}
              shop={item.shop}
              isLove={item.isLove}
              price={item.price}
              image={item.image}
              onPressLove={() => alert(item.storeID)}
              onPressItem={() => {
                item.onPressItem(item.storeID);
              }}
            />
          )}
          keyExtractor={item => item.itemID.toString()}
        />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          data={shops}
          onEndReached={searchShops}
          onEndReachedThreshold={1}
          ListFooterComponent={
            !lastPageReached ? (
              <Text style={{ textAlign: "center" }}></Text>
            ) : (
              <ActivityIndicator size="large" loading={loading} />
            )
          }
          renderItem={({ item }) => (
            <Shop
              vote={item.vote}
              shop={item.shop}
              isLove={item.isLove}
              price={item.price}
              distance={item.distance}
              image={item.image}
              onPressLove={() => alert(item.storeID)}
              onPressItem={() => {
                item.onPressItem(item.storeID);
              }}
            />
          )}
          keyExtractor={item => item.storeID}
        />
      )}
    </SafeAreaView>
  );
};

SearchingShopListScreen.navigationOptions = {
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
    marginTop: 20
  },
  input: {
    width: 0.82 * windowWidth - 90,
    fontSize: 18,
    fontWeight: "400",
    color: "#3C3D47"
  },
  searchButton: {
    backgroundColor: "#E9895D",
    width: 0.82 * windowWidth,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginRight: 5
  }
});

export default SearchingShopListScreen;
