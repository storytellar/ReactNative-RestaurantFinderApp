import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  ActivityIndicator
} from "react-native";
import { Linking } from "expo";

import { getStoreDetail } from "../controllers/store.controller";

import IconHeart from "../assets/svg/heart.svg";
import IconLeft from "../assets/svg/left.svg";
import IconCheckin from "../assets/svg/checkin.svg";
import IconOffer from "../assets/svg/offer.svg";

import Item from "../components/Item";
import { ScrollView } from "react-native-gesture-handler";

const windowWidth = Dimensions.get("window").width;

const DetailScreen = props => {
  // Declare hook
  const [displayData, setDisplayData] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  // Get storeID
  const storeID = props.navigation.getParam("storeID", -1);

  // Check existence of storeID
  if (storeID === -1) {
    console.log("This storeID does not exist");
    props.navigation.goBack();
  }
  else {
    React.useEffect(() => {
      loadAllInfo(storeID)
    }, []);
  }

  // Load all necessary information
  const loadAllInfo = async (storeID) => {
    setLoading(true);
    const data = await getStoreDetail(storeID);
    setDisplayData(data);
    setLoading(false);
  }

  // Loading...
  if (loading) {
    return (
      <View style={styles.container}>
          <ActivityIndicator size="small" loading={loading} />
      </View>
    )
  }

  // Render view
  return (
    <View style={styles.container}>
      {/* ImageBox */}
      <View style={styles.ImageBox}>
        <Image style={styles.bigPhoto} source={displayData.imageUrl} />
      </View>

      {/* InfoBox */}
      <View style={styles.InfoBox}>
        {/* FavoriteBox */}
        <View style={styles.FavoriteBox}>
          <TouchableOpacity
            onPress={() => {
              alert("Thả tim " + storeID);
            }}
          >
            <IconHeart
              width={36}
              height={36}
              fill={(displayData.isFavorite == "1") ? "#F66767" : "#545454"}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.shopMainInfo}>
          <Text style={styles.ShopName}>{displayData.name}</Text>
          <View style={styles.shopInfo}>
            <View style={styles.rowDirection}>
              <IconCheckin width={26} height={26} fill={"#D8B05E"} />
              <Text style={styles.miniText}>{displayData.address}</Text>
            </View>
            <View style={[styles.rowDirection, { paddingTop: 5 }]}>
              <IconOffer width={26} height={26} fill={"#D8B05E"} />
              <Text style={styles.miniText}>{displayData.cashback}</Text>
            </View>
          </View>
        </View>
        <View style={styles.shopAdditionalInfo}>
          <ScrollView
            contentContainerStyle={styles.centerAll}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.description}>{displayData.description}</Text>
            <FlatList
              contentContainerStyle={{ paddingHorizontal: 15 }}
              data={displayData.menu}
              renderItem={({ item }) => (
                <Item
                  title={item.name}
                  isBestSeller={item.isPopular == "1"}
                  price={item.unitPrice}
                  image={item.img}
                />
              )}
              keyExtractor={item => item.food_id}
            />
          </ScrollView>
        </View>
      </View>

      {/* GoBackBox */}
      <View style={styles.GoBackBox}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <View style={styles.GoBackButton}>
            <IconLeft width={26} height={26} fill={"#545454"} />
          </View>
        </TouchableOpacity>
      </View>

      {/* OrderButtonBox */}
      <View style={styles.OrderButtonBox}>
        <TouchableOpacity
          onPress={async () => {
            var s = displayData.name;
            var phone =
              "1900" +
              (s.charCodeAt(0) + s.charCodeAt(1)) +
              (s.charCodeAt(0) % 10);
            Linking.openURL(`tel:${phone}`);
          }}
        >
          <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
            Review
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  ImageBox: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "50%"
  },
  bigPhoto: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  InfoBox: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "60%",
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderWidth: 1,
    borderColor: "#979797"
  },
  shopMainInfo: {
    // backgroundColor: 'red',
    marginHorizontal: 30,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    // borderBottomWidth: 1,
    borderBottomColor: "#bbb",
    paddingBottom: 15
  },
  shopAdditionalInfo: {
    flex: 0.87
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    color: "#3C3D46",
    paddingHorizontal: 50,
    paddingVertical: 10
  },
  shopInfo: {
    justifyContent: "space-between"
  },
  rowDirection: {
    flexDirection: "row",
    alignItems: "flex-end"
  },
  ShopName: {
    paddingVertical: 10,
    width: (windowWidth * 75) / 100,
    fontSize: 36,
    fontWeight: "bold",
    color: "#3C3D46"
  },
  miniText: {
    color: "#D6AC56",
    fontSize: 16,
    fontWeight: "400",
    paddingLeft: 5
  },
  FavoriteBox: {
    marginTop: -37,
    marginLeft: 45,
    width: 73,
    height: 73,
    borderRadius: 36.5,
    borderWidth: 1,
    borderColor: "#979797",
    backgroundColor: "white",

    alignItems: "center",
    justifyContent: "center"
  },
  GoBackBox: {
    position: "absolute",
    top: 50,
    left: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#545454",
    backgroundColor: "white",

    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,

    elevation: 1
  },
  GoBackButton: {
    width: 45,
    height: 48,
    alignItems: "center",
    justifyContent: "center"
  },
  OrderButtonBox: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "8%",
    backgroundColor: "#E9895D",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    // borderBottomRightRadius: 40,
    // borderBottmLeftRadius: 40,
    // borderRadius: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  centerAll: {
    alignItems: "center",
    justifyContent: "center"
  }
});

DetailScreen.navigationOptions = {
  header: null
};

export default DetailScreen;
