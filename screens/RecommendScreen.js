import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  AsyncStorage,
  FlatList
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";

import Item from "../components/Item";
import Category from "../components/Category";
import Banner from "../components/Banner";

const windowWidth = Dimensions.get("window").width;

const RecommendScreen = props => {
  const goDetail = () => {
    props.navigation.navigate("Detail");
  };

  const _storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {}
  };

  const items = [
    {
      title: "Đùi gà siêu giòn",
      vote: 5.0,
      shop: "Otoké Chicken",
      isLove: true,
      price: 30,
      image: require("../assets/images/combosmall.jpg"),
      onPressItem: () => goDetail()
    },
    {
      title: "Cơm cánh gà rán",
      vote: 5.0,
      shop: "Otoké Chicken",
      isLove: true,
      price: 30,
      image: require("../assets/images/DemoImage1.jpg"),
      onPressItem: () => goDetail()
    },
    {
      title: "Cơm cá phi lê",
      vote: 5.0,
      shop: "Otoké Chicken",
      isLove: false,
      price: 30,
      image: require("../assets/images/comca.jpg"),
      onPressItem: () => goDetail()
    },
    {
      title: "Combo cơm trưa",
      vote: 5.0,
      shop: "Otoké Chicken",
      isLove: true,
      price: 30,
      image: require("../assets/images/DemoImage1.jpg"),
      onPressItem: () => goDetail()
    },
    {
      title: "Cơm gà siêu cay",
      vote: 5.0,
      shop: "Otoké Chicken",
      isLove: true,
      price: 30,
      image: require("../assets/images/combosmall.jpg"),
      onPressItem: () => goDetail()
    },
  ];

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
            <Banner
              onPressBanner={goDetail}
              img={require("../assets/images/banner.jpg")}
            />
            <Banner
              onPressBanner={goDetail}
              img={require("../assets/images/banner1.jpg")}
            />
            <Banner
              onPressBanner={goDetail}
              img={require("../assets/images/banner.jpg")}
            />
            <Banner
              onPressBanner={goDetail}
              img={require("../assets/images/banner1.jpg")}
            />

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

        {/* List of items */}
        <FlatList
          contentContainerStyle={{paddingHorizontal: 15,}}
          data={items}
          renderItem={({ item }) => (
            <Item title={item.title} vote={item.vote} shop={item.shop} isLove={item.isLove} price={item.price} image={item.image} onPressItem={item.onPressItem}/>
          )}
          keyExtractor={item => item.title}
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
    alignItems: "center"
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
