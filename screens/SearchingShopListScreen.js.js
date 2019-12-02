import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  AsyncStorage
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
  // Declare hook
  const [shops, setShops] = React.useState([]);
  const [foods, setFoods] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [lastPageReached, setLastPageReached] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(1);

  // Declare global variable
  let LATITUDE = (props.navigation.getParam("location")).latitude
  let LONGITUDE = (props.navigation.getParam("location")).longitude
  let keyword = props.navigation.getParam("keyword")
  let searchType = props.navigation.getParam("searchType")

  // searchType:
  // 1: Food
  // 2: Store

  // First running => Get all necessary data
  React.useEffect(() => {
    if (searchType === 1) searchFoods();
    else searchShops();
  }, []);

  // Searching shops
  const searchShops = async () => {
    if (lastPageReached) return
    setLoading(true);

    let token = JSON.parse(await AsyncStorage.getItem("@account")).token;
    let data = await getListStoreByKeyword(
      token, 
      "store", 
      keyword, 
      pageNumber, 
      LATITUDE, 
      LONGITUDE, 
      props
    );
    
    if (data == null) setLastPageReached(true)
    else {
      let newShopList = shops.concat(data)
      setShops(newShopList)
      setPageNumber(pageNumber + 1)
    }

    setLoading(false);
  };

  // Searching food
  const searchFoods = async () => {
    if (lastPageReached) return
    setLoading(true);

    let token = JSON.parse(await AsyncStorage.getItem("@account")).token;
    let data = await getListFoodByKeyword(
      token, 
      "food", 
      keyword, 
      pageNumber, 
      LATITUDE, 
      LONGITUDE, 
      props
    );
    
    if (data == null) setLastPageReached(true)
    else {
      let newFoodList = foods.concat(data)
      setFoods(newFoodList)
      setPageNumber(pageNumber + 1)
    }

    setLoading(false);
  };

  // Render view
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBoxWrapper}>
          <TouchableOpacity
            style={[styles.searchButton, { flexDirection: "row" }]}
            onPress={() => props.navigation.goBack()}
          >
            <IconSearch width={28} height={28} fill={"white"} />
            <Text style={{ fontSize: 18, color: "white" }}> Go back</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ height: 10 }}></View>
      {
        props.navigation.getParam("searchType") === 1 ? 
        (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            data={foods}
            onEndReached={searchFoods}
            onEndReachedThreshold={1}
            ListFooterComponent={
              lastPageReached ? (
                <Text style={{ textAlign: "center" }}>End of page</Text>
              ) : (
                <ActivityIndicator size="small" loading={loading} />
              )
            }
            renderItem={({ item }) => (
              <ItemDetail
                key={item.food_id}
                title={item.name}
                vote={item.stars}
                shop={item.store_name}
                isLove={item.isPopular}
                price={item.unitPrice}
                image={item.img}
                onPressLove={() => alert(item.store_id)}
                onPressItem={() => {
                  item.onPressItem(item.store_id);
                }}
              />
            )}
            keyExtractor={item => item.food_id}
          />
        ) : 
        (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            data={shops}
            onEndReached={searchShops}
            onEndReachedThreshold={1}
            ListFooterComponent={
              lastPageReached ? (
                <Text style={{ textAlign: "center" }}>End of page</Text>
              ) : (
                <ActivityIndicator size="small" loading={loading} />
              )
            }
            renderItem={({ item }) => (
              <Shop
                key={item.store_id}
                vote={item.stars}
                shop={item.store_name}
                isLove={item.isFavorite}
                price={item.avg_price}
                distance={Math.round(item.distance * 100) / 100}
                image={item.imgLink}
                onPressLove={() => alert(item.store_id)}
                onPressItem={() => {
                  item.onPressItem(item.store_id);
                }}
              />
            )}
            keyExtractor={item => item.store_id}
          />
        )
      }
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
