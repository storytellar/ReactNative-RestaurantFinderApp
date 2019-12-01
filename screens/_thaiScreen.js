import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  AsyncStorage,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import { getListRecommendStore } from "../controllers/store.controller";

import Shop from "../components/Shop";
import Category from "../components/Category";
import Banner from "../components/Banner";

const windowWidth = Dimensions.get("window").width;

const RecommendScreen = props => {
  _getLocationAsync = async () => {
    var location;
    var { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      setLocation({ latitude: -1, longitude: -1 });
    }
    try {
      location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    } catch (error) {}
    return location.coords;
  };

  const goDetail = storeID => {
    props.navigation.navigate("Detail", { storeID });
  };

  const [location, setLocation] = React.useState({ latitude: 0, longitude: 0 });
  const [errorLocation, setErrorLocation] = React.useState("");
  const [shops, setShops] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [hasErrored, setHasApiError] = React.useState(false);
  const [lastPageReached, setLastPageReached] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(1);

  var banners = [
    {
      storeID: "123",
      imageUrl: require("../assets/images/banner.jpg")
    },
    {
      storeID: "456",
      imageUrl: require("../assets/images/banner.jpg")
    },
    {
      storeID: "789",
      imageUrl: require("../assets/images/banner.jpg")
    }
  ];

  React.useEffect(() => {
    getShops();
  }, []);

  const getShops = async () => {
    if (pageNumber === 3) setLastPageReached(true);
    if (lastPageReached) return;
    setLoading(true);
    await _getLocationAsync();
    newShopList = await getListRecommendStore(
      pageNumber,
      location.longitude,
      location.latitude,
      props
    );
    const hasMoreShop = newShopList.length > 0;
    if (hasMoreShop) {
      const newShops = shops.concat(newShopList);
      setShops(newShops);
      setPageNumber(pageNumber + 1);
    } else {
      setLastPageReached(true);
    }
    setLoading(false);
  };

  const _storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {}
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.containerScrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* List of banner */}
        <View style={styles.bannerScrollWrapper}>
          <ScrollView
            contentContainerStyle={styles.bannerScroll}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <View style={{ width: windowWidth / 10 - 10 }}></View>
            {banners.map(banner => {
              return (
                <Banner
                  key={banner.storeID}
                  onPressBanner={() => goDetail(banner.storeID)}
                  img={banner.imageUrl}
                />
              );
            })}
            <View style={{ width: windowWidth / 10 }}></View>
          </ScrollView>
        </View>

        {/* List of Category */}
        <View style={styles.CategoryWrapper}>
          <Category
            name="Drink"
            onPressButton={() => {
              _storeData("@keyword", "Drink");
              props.navigation.navigate("Search");
            }}
          />
          <Category
            name="Food"
            onPressButton={() => {
              _storeData("@keyword", "Food");
              props.navigation.navigate("Search");
            }}
          />
          <Category name="Drinks" />
          <Category name="Drinks" />
          <Category name="Drinks" />
        </View>

        {/* Classify List (Button) */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              backgroundColor: "#DC8D66",
              width: (9.5384615385 * windowWidth) / 12 / 2 - 20,
              height: 40,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 0.5,
              borderColor: '#DC8D66'
            }}
          >
            <Text style={{fontSize: 16, color: 'white', fontWeight: '500'}}>STORE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              width: (9.5384615385 * windowWidth) / 12 / 2 - 20,
              height: 40,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 0.5,
              borderColor: '#DC8D66'

            }}
          >
            <Text style={{fontSize: 16, color: '#DC8D66', fontWeight: '500'}}>FOOD</Text>
          </TouchableOpacity>
        </View>

        {/* List of Shops */}
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ flex: 1, paddingHorizontal: 15 }}
          data={shops}
          onEndReached={getShops}
          onEndReachedThreshold={1}
          ListFooterComponent={
            lastPageReached ? (
              <Text style={{ textAlign: "center" }}>
                Không còn sản phẩm phù hợp.
              </Text>
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
              onPressLove={() => {
                alert(item.storeID);
              }}
              onPressItem={() => {
                item.onPressItem(item.storeID);
              }}
            />
          )}
          keyExtractor={item => item.storeID}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

RecommendScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFCFA"
  },
  containerScrollView: {
    alignItems: "center"
  },
  bannerScrollWrapper: {
    height: 200,
    marginTop: 20
  },
  CategoryWrapper: {
    marginTop: 10,
    width: (9.5384615385 * windowWidth) / 12,
    height: 85,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default RecommendScreen;
