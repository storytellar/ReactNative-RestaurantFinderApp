import React from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";

import Item from "../components/Item";
import Category from "../components/Category";

const windowWidth = Dimensions.get("window").width;

const RecommendScreen = props => {
  const goDetail = () => {
    props.navigation.navigate("Detail");
  };

  const _storeData = async (key,value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
    }
  };

  // Quick VIEW for develop FRONT_END
  // props.navigation.navigate("Search")

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bannerScrollWrapper}>
        <ScrollView
          contentContainerStyle={styles.bannerScroll}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity
            style={styles.bigPhotoWrapper}
            onPress={() => goDetail()}
          >
            <Image
              style={styles.bigPhoto}
              source={require("../assets/images/DemoImage1.jpg")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bigPhotoWrapper}
            onPress={() => goDetail()}
          >
            <Image
              style={styles.bigPhoto}
              source={require("../assets/images/DemoImage1.jpg")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bigPhotoWrapper}
            onPress={() => goDetail()}
          >
            <Image
              style={styles.bigPhoto}
              source={require("../assets/images/DemoImage1.jpg")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bigPhotoWrapper}
            onPress={() => goDetail()}
          >
            <Image
              style={styles.bigPhoto}
              source={require("../assets/images/DemoImage1.jpg")}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.CategoryWrapper}>
        <Category
          name="Drink"
          onPressButton={() => {
            _storeData("@keyword","Drink");
            props.navigation.navigate("Search");
          }}
        />
        <Category name="Food" 
            onPressButton={() => {
            _storeData("@keyword","Food");
            props.navigation.navigate("Search");
          }}
        />
        <Category name="Drinks" />
        <Category name="Drinks" />
        <Category name="Drinks" />
      </View>

      <View style={styles.itemList}>
        <ScrollView
          contentContainerStyle={styles.itemScroll}
          showsVerticalScrollIndicator={false}
        >
          <Item
            title="Ice Cream Cupcake"
            vote={4.9}
            shop="Kem Baskin Robbins"
            isLove={true}
            price={30}
            image={require("../assets/images/DemoImage1.jpg")}
            onPressItem={() => goDetail()}
          />
          <Item
            title="Ice Cream Cupcake"
            vote={4.9}
            shop="Kem Baskin Robbins"
            isLove={true}
            price={30}
            image={require("../assets/images/DemoImage1.jpg")}
            onPressItem={() => goDetail()}
          />
          <Item
            title="Ice Cream Cupcake"
            vote={4.9}
            shop="Kem Baskin Robbins"
            isLove={true}
            price={30}
            image={require("../assets/images/DemoImage1.jpg")}
            onPressItem={() => goDetail()}
          />
          <Item
            title="Ice Cream Cupcake"
            vote={4.9}
            shop="Kem Baskin Robbins"
            isLove={true}
            price={30}
            image={require("../assets/images/DemoImage1.jpg")}
            onPressItem={() => goDetail()}
          />
          <Item
            title="Ice Cream Cupcake"
            vote={4.9}
            shop="Kem Baskin Robbins"
            isLove={true}
            price={30}
            image={require("../assets/images/DemoImage1.jpg")}
            onPressItem={() => goDetail()}
          />
          <Item
            title="Ice Cream Cupcake"
            vote={4.9}
            shop="Kem Baskin Robbins"
            isLove={true}
            price={30}
            image={require("../assets/images/DemoImage1.jpg")}
            onPressItem={() => goDetail()}
          />
          <Item
            title="Ice Cream Cupcake"
            vote={4.9}
            shop="Kem Baskin Robbins"
            isLove={true}
            price={30}
            image={require("../assets/images/DemoImage1.jpg")}
            onPressItem={() => goDetail()}
          />
          <Item
            title="Ice Cream Cupcake"
            vote={4.9}
            shop="Kem Baskin Robbins"
            isLove={true}
            price={30}
            image={require("../assets/images/DemoImage1.jpg")}
            onPressItem={() => goDetail()}
          />
          <Item
            title="Ice Cream Cupcake"
            vote={4.9}
            shop="Kem Baskin Robbins"
            isLove={true}
            price={30}
            image={require("../assets/images/DemoImage1.jpg")}
            onPressItem={() => goDetail()}
          />
        </ScrollView>
      </View>
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
  bannerScrollWrapper: {
    height: 200,
    marginTop: 20,
    marginLeft: windowWidth / 10 - 10
  },
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
    borderWidth: 1,
  },
  CategoryWrapper: {
    marginTop: 10,
    width: (9.5384615385 * windowWidth) / 12,
    height: 85,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  itemList: {
    marginTop: 10,
    flex: 1
  },
  itemScroll: {
    alignItems: "center",
    width: 360
  }
});

export default RecommendScreen;
