import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  AsyncStorage,
  FlatList,
  ActivityIndicator,
  Text
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import  { getListRecommendStore, 
          getBanners, 
          getCategory 
        } from "../controllers/store.controller";

import Shop from "../components/Shop";
import Category from "../components/Category";
import Banner from "../components/Banner";

const windowWidth = Dimensions.get("window").width;

const RecommendScreen = props => {
  // Declare hook
  const [location, setLocation] = React.useState({ latitude: 0, longitude: 0 });
  const [stores, setStores] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [lastPageReached, setLastPageReached] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [error, setError] = React.useState("");

  // First running => Get all necessary data
  React.useEffect(() => {
    getSuggestedStores();
  }, []);

  // Get location (latlong) of user through their GPS
  _getLocationAsync = async () => {
    var location;
    var { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      setLocation({ latitude: 0, longitude: 0 });
    }
    try {
      location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    } 
    catch (error) {
      setError(error.toString())
    }
    return location.coords;
  };

  // Get all info about store
  const getSuggestedStores = async () => {
    if (lastPageReached) return;
    setLoading(true);

    await _getLocationAsync();

    let token = await AsyncStorage.getItem("@account");
    let data = await getListRecommendStore(token, pageNumber, location.latitude, location.longitude, props )

    if (data.length == 0) {
      setLastPageReached(true);
    }
    else {
      let newStoreList = stores.concat(data);
      setStores(newStoreList);
      setPageNumber(pageNumber + 1);
    }
    
    setLoading(false);
  };
  
  // Function for jumping detail page
  const goDetail = storeID => {
    props.navigation.navigate("Detail", { storeID });
  };

  // Store data (key-value) to localStorage
  const _storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {}
  };

  // Load all info of banners
  loadBanners = async () => {
    let token = await AsyncStorage.getItem("@account");
    let data = await getBanners(token);

    if (data == null) {
      return (<></>);
    }

    return (
     <> {
        data.map(banner => {
          return (
            <Banner
              key={banner.store_id}
              onPressBanner={() => goDetail(banner.store_id)}
              img={banner.img}
            />
          )
        })
      } </> 
    );
  }

  // Load all info of category list
  loadCategory = async () => {
    let token = await AsyncStorage.getItem("@account");
    let data = await getCategory(token);

    if (data == null) {
      return (<></>);
    }

    return (
     <> {
        data.map(cate => {
          return (
            <Category
              name={cate.label}
              onPressButton={() => {
                _storeData("@keyword", cate.label);
                props.navigation.navigate("Search");
              }}
            />
          )
        })
      } </> 
    );
  }

  // Catching error
  if (error.length != 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Error: {error}</Text>
        <Text>You should re-login for loading data again</Text>
      </SafeAreaView>
    );
  }

  // Render view
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.containerScrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner list */}
        <View style={styles.bannerScrollWrapper}>
          <ScrollView
            contentContainerStyle={styles.bannerScroll}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <View style={{ width: windowWidth / 10 - 10 }}></View>
            { 
              async () => await this.loadBanners() 
            }
            <View style={{ width: windowWidth / 10 }}></View>
          </ScrollView>
        </View>

        {/* Category list */}
        <View style={styles.CategoryWrapper}>
          { 
            async () => await this.loadCategory() 
          }
        </View>

        {/* Store list */}
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}
          contentContainerStyle={{flex: 1, paddingHorizontal: 15 }}
          data={stores}
          onEndReached={getSuggestedStores}
          onEndReachedThreshold={1}
          ListFooterComponent={
            lastPageReached ? 
            (
              <Text style={{ textAlign: "center" }}>
                End of page
              </Text>
            ) : 
            (
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
              onPressLove={() => {alert(item.storeID);}}
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
