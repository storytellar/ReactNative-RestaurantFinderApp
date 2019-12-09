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

import {
  getListRecommendStore,
  getListRecommendFood,
  getBanners,
  getCategory
} from "../controllers/store.controller";

import Shop from "../components/Shop";
import ItemDetail from "../components/ItemDetail";
import Category from "../components/Category";
import Banner from "../components/Banner";

const windowWidth = Dimensions.get("window").width;

const RecommendScreen = props => {
  // Declare hook
  const [stores, setStores] = React.useState([]);
  const [food, setFood] = React.useState([]);
  const [banners, setBanners] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [loadingPage, setLoadingPage] = React.useState(true);
  const [loadingStore, setLoadingStore] = React.useState(false);
  const [loadingFood, setLoadingFood] = React.useState(false);
  const [lastFoodPageReached, setLastFoodPageReached] = React.useState(false);
  const [lastStorePageReached, setLastStorePageReached] = React.useState(false);
  const [pageNumberFood, setPageNumberFood] = React.useState(1);
  const [pageNumberStore, setPageNumberStore] = React.useState(1);
  const [suggestOption, setSuggestOption] = React.useState(1);
  
  // SearchOption:
  // 1: Food
  // 2: Store

  // Declare global variable
  let LATITUDE = 0
  let LONGITUDE = 0

  // --------------------------------------------------
  // NECESSARY FUNCTIONS
  // --------------------------------------------------

  // First running => Get all necessary data
  React.useEffect(() => {
    getAllData()
  }, []);
  
  // Get all data
  const getAllData = async () => {
    setLoadingPage(true);

    await _getLocationAsync();

    let token = JSON.parse(await AsyncStorage.getItem("@account")).token;

    let data_response = await Promise.all([
      getListRecommendFood(
        token,
        pageNumberFood,
        LATITUDE,
        LONGITUDE,
        props
      ), 
      getBanners(token), 
      getCategory(token), 
      getListRecommendStore(
        token,
        pageNumberStore,
        LATITUDE,
        LONGITUDE,
        props
      )
    ]);
    
    let foodRes = data_response[0]
    let bannersRes = data_response[1]
    let categoriesRes = data_response[2]
    let storesRes = data_response[3]

    if (foodRes == null) {
      setLastFoodPageReached(true);
    } else {
      let newFoodList = food.concat(foodRes);
      setFood(newFoodList);
      setPageNumberFood(pageNumberFood + 1);
    }

    if (bannersRes != null) {
      setBanners(bannersRes);
    }

    if (categoriesRes != null) {
      setCategories(categoriesRes);
    }

    if (storesRes == null) {
      setLastStorePageReached(true);
    } else {
      let newStoreList = stores.concat(storesRes);
      setStores(newStoreList);
      setPageNumberStore(pageNumberStore + 1);
    }

    setLoadingPage(false);
  };
  
  // Get location (latlong) of user through their GPS
  const _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      LATITUDE = LONGITUDE = 0
      return
    }
    
    let locRes = await Location.getCurrentPositionAsync({enableHighAccuracy: true}); 
    LATITUDE = locRes.coords.latitude
    LONGITUDE = locRes.coords.longitude
  };

  // Get all info about FOOD
  const getSuggestedFood = async () => {
    if (lastFoodPageReached) return;
    setLoadingFood(true);
    
    await _getLocationAsync();
    
    let token = JSON.parse(await AsyncStorage.getItem("@account")).token;
    let data = await getListRecommendFood(
      token,
      pageNumberFood,
      LATITUDE,
      LONGITUDE,
      props
    );
    

    if (data == null) {
      setLastFoodPageReached(true);
    } else {
      let newFoodList = food.concat(data);
      setFood(newFoodList);
      setPageNumberFood(pageNumberFood + 1);
    }

    setLoadingFood(false);
  }

  // Get all info about STORE
  const getSuggestedStores = async () => {
    if (lastStorePageReached) return;
    setLoadingStore(true);

    await _getLocationAsync();
    
    let token = JSON.parse(await AsyncStorage.getItem("@account")).token;
    let data = await getListRecommendStore(
      token,
      pageNumberStore,
      LATITUDE,
      LONGITUDE,
      props
    );

    if (data == null) {
      setLastStorePageReached(true);
    } else {
      let newStoreList = stores.concat(data);
      setStores(newStoreList);
      setPageNumberStore(pageNumberStore + 1);
    }

    setLoadingStore(false);
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
    let token = JSON.parse(await AsyncStorage.getItem("@account")).token;
    let data = await getBanners(token);
    
    if (data != null) {
      setBanners(data);
      return;
    }

    setBanners([]);
  };

  // Load all info of category list
  loadCategory = async () => {
    let token = JSON.parse(await AsyncStorage.getItem("@account")).token;
    let data = await getCategory(token);

    if (data != null) {
      setCategories(data);
      return;
    }

    setCategories([]);
  };

  // --------------------------------------------------
  // RENDER VIEW (FAKE AND OFFICIAL)
  // --------------------------------------------------

  // Render header (banners, categories, buttons)
  const renderHeader = () => {
    return (
      <View style={styles.container}>
        {/* Banner list */}
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
                  key={banner.store_id}
                  onPressBanner={() => goDetail(banner.store_id)}
                  img={banner.img}
                />
              );
            })}
            <View style={{ width: windowWidth / 10 }}></View>
          </ScrollView>
        </View>

        {/* Category list */}
        <View style={styles.CategoryWrapper}>
          {categories.map(cate => {
            return (
              <Category
                key={cate.concern_id}
                id={cate.concern_id}
                name={cate.short_label}
                onPressButton={() => {
                  _storeData("@keyword", cate.label);
                  props.navigation.navigate("Search");
                }}
              />
            );
          })}
        </View>

        {/* Classify List (Button) */}
        <View style={styles.optionButtons}>
          <TouchableOpacity
            style={[
              styles.optionLeftButton,
              suggestOption === 1 ? styles.optionActiveButton : ""
            ]}
            onPress={() => setSuggestOption(1)}
          >
            <Text
              style={[
                styles.optionText,
                suggestOption === 1 ? styles.optionActiveText : ""
              ]}
            >
              FOOD
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionRightButton,
              suggestOption === 2 ? styles.optionActiveButton : ""
            ]}
            onPress={() => setSuggestOption(2)}
          >
            <Text
              style={[
                styles.optionText,
                suggestOption === 2 ? styles.optionActiveText : ""
              ]}
            >
              STORE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  // Render item (for flatlist)
  const renderAllItemFlatList = ({ item }) => {
    return (
      <View style={styles.container}>
        {
          (suggestOption == 1) ?
          (
            // Food list
            <ItemDetail
              key={item.food_id}
              title={item.name}
              vote={item.stars}
              shop={item.store_name}
              isLove={item.isPopular}
              price={item.unitPrice}
              image={item.img}
              onPressItem={() => {
                item.onPressItem(item.store_id);
              }}
            />
          ) :
          (
            // Store list
            <Shop
              key={item.store_id}
              vote={item.stars}
              shop={item.store_name}
              isLove={item.isFavorite}
              price={item.avg_price}
              distance={Math.round(item.distance * 100) / 100}
              image={item.imgLink}
              onPressLove={item.store_id}
              onPressItem={() => {
                item.onPressItem(item.store_id);
              }}
            />
          )
        }
      </View>
    );
  }

  // Lazy load: Fake food
  const fakeFood = () => {
    return (
      <>
        <View style={styles.defaultFoodList}></View>
        <View style={styles.defaultFoodList}></View>
        <View style={styles.defaultFoodList}></View>
        <View style={styles.defaultFoodList}></View>
      </>
    )
  }

  // Lazy load: Fake category
  const fakeCategory = () => {
    return (
      <>
        <View>
          <View style={styles.defaultCircleCategory}></View>
          <View style={styles.defaultTextCategory}></View>
        </View>
        <View>
          <View style={styles.defaultCircleCategory}></View>
          <View style={styles.defaultTextCategory}></View>
        </View>
        <View>
          <View style={styles.defaultCircleCategory}></View>
          <View style={styles.defaultTextCategory}></View>
        </View>
        <View>
          <View style={styles.defaultCircleCategory}></View>
          <View style={styles.defaultTextCategory}></View>
        </View>
        <View>
          <View style={styles.defaultCircleCategory}></View>
          <View style={styles.defaultTextCategory}></View>
        </View>
      </>
    );
  }

  // Lazy load: Render fake data
  if (loadingPage) {
    return (
      <SafeAreaView style={styles.container}>
        {/* Banners */}
        <View style={styles.bannerScrollWrapper}>
          <View style={{ width: windowWidth / 10 - 10 }}></View>
          <View style={styles.defaultBanner}></View>
          <View style={{ width: windowWidth / 10 }}></View>
        </View>

        {/* Categories */}
        <View style={styles.CategoryWrapper}>
          {
            fakeCategory()
          }
        </View>
        
        {/* Button */}
        <View style={styles.defaultOptionButtons}>
          <View style={[styles.defaultOptionLeftButton, styles.defaultOptionActiveButton ]}></View>
          <View style={styles.defaultOptionRightButton}></View>
        </View>

        {/* Food list */}
        <View>
          {
            fakeFood()
          }
        </View>
      </SafeAreaView>
    );
  }
  else {
    // Render official view
    return (
      <SafeAreaView style={styles.container}>
        {
          (suggestOption == 1) ? 
          (
            // Food list
            <FlatList
              showsVerticalScrollIndicator={false}
              data={food}
              ListHeaderComponent={renderHeader}
              onEndReached={getSuggestedFood}
              onEndReachedThreshold={0.1}
              ListFooterComponent={
                lastFoodPageReached ? (
                  <Text style={{ textAlign: "center", marginVertical: 10 }}>End of page</Text>
                ) : (
                  <ActivityIndicator size="small" loading={loadingFood} />
                )
              }
              renderItem={renderAllItemFlatList}
              keyExtractor={item => item.food_id.toString() + Math.random()}
            />
          ) : 
          (
            // Store list
            <FlatList
              showsVerticalScrollIndicator={false}
              data={stores}
              ListHeaderComponent={renderHeader}
              onEndReached={getSuggestedStores}
              onEndReachedThreshold={0.1}
              ListFooterComponent={
                lastStorePageReached ? (
                  <Text style={{ textAlign: "center", marginVertical: 10 }}>End of page</Text>
                ) : (
                  <ActivityIndicator size="small" loading={loadingStore} />
                )
              }
              renderItem={renderAllItemFlatList}
              keyExtractor={item => item.store_id}
            />
          )
        }
      </SafeAreaView>
    );
  }
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
  bannerScrollWrapper: {
    height: 200,
    marginTop: 20
  },
  CategoryWrapper: {
    marginTop: 10,
    width: (9.5384615385 * windowWidth) / 12,
    height: 85,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 5
  },
  optionLeftButton: {
    flexDirection: "row",
    backgroundColor: "white",
    width: (9.5384615385 * windowWidth) / 12 / 2 - 20,
    height: 40,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#DC8D66"
  },
  optionRightButton: {
    flexDirection: "row",
    backgroundColor: "white",
    width: (9.5384615385 * windowWidth) / 12 / 2 - 20,
    height: 40,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#DC8D66"
  },
  optionActiveButton: {
    backgroundColor: "#DC8D66"
  },
  optionText: { 
    fontSize: 16, 
    color: "#DC8D66", 
    fontWeight: "500" 
  },
  optionActiveText: { 
    color: "white" 
  },
  defaultBanner: {
    width: (9.5 * windowWidth) / 12,
    height: 180,
    borderRadius: 30,
    borderColor: "#ECECEC",
    backgroundColor: '#ECECEC',
    borderWidth: 1
  },
  defaultCircleCategory: {
    width: 55,
    height: 55,
    borderRadius: 100,
    borderColor: "#ECECEC",
    backgroundColor: '#ECECEC',
    borderWidth: 1
  },
  defaultTextCategory: {
    width: 55,
    height: 15,
    marginTop: 12,
    borderColor: "#ECECEC",
    backgroundColor: '#ECECEC',
    borderWidth: 1
  },
  defaultOptionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 5
  },
  defaultOptionActiveButton: {
    backgroundColor: "#ECECEC"
  },
  defaultOptionLeftButton: {
    flexDirection: "row",
    backgroundColor: "white",
    width: (9.5384615385 * windowWidth) / 12 / 2 - 20,
    height: 40,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#ECECEC"
  },
  defaultOptionRightButton: {
    flexDirection: "row",
    backgroundColor: "#FCFCFC",
    width: (9.5384615385 * windowWidth) / 12 / 2 - 20,
    height: 40,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#ECECEC"
  },
  defaultFoodList: {    
    marginVertical: 10,
    width: (9.5384615385 * windowWidth) / 12,
    height: 100,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#ECECEC",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 8,

    backgroundColor: '#ECECEC',
  }
});

export default RecommendScreen;
