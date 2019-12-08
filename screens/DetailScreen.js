import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  ActivityIndicator,
  AsyncStorage
} from "react-native";

import {
  getStoreDetail,
  addMyNewFavStore,
  removeMyFavStore
} from "../controllers/store.controller";

import IconHeart from "../assets/svg/heart.svg";
import IconLeft from "../assets/svg/left.svg";
import IconCheckin from "../assets/svg/checkin.svg";
import IconOffer from "../assets/svg/offer.svg";

import Item from "../components/Item";

const windowWidth = Dimensions.get("window").width;

const DetailScreen = props => {
  // Declare hook
  const [displayData, setDisplayData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [isFavorite, setFavorite] = React.useState(false);
  const [error, setError] = React.useState("");

  const [isLargeView, setIsLargeView] = React.useState(false);

  // Get storeID
  const storeID = props.navigation.getParam("storeID", -1);

  // Check existence of storeID
  if (storeID === -1) {
    setError("This store does not exist, please try later");
  } else {
    React.useEffect(() => {
      loadAllInfo(storeID);
    }, []);
  }

  // Load all necessary information
  const loadAllInfo = async storeID => {
    let token = JSON.parse(await AsyncStorage.getItem("@account")).token;
    let data = await getStoreDetail(token, storeID);
    if (data == null) {
      setLoading(false);
      setError(
        "Server losts some information of this store, so nothing displayed"
      );
      return;
    }
    setDisplayData(data);
    setFavorite(data.isFavorite);
    setLoading(false);
  };

  // Loading...
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" loading={loading} />
      </View>
    );
  }

  // Error...
  if (error.length != 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <View style={styles.errorButton}>
            <Text style={styles.errorTextButton}>BACK</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  // Function: Update value of isFavorite (isLove) store
  const updateMyFavoriteStore = async () => {
    setFavorite(!isFavorite);
    
    let token = JSON.parse(await AsyncStorage.getItem("@account")).token;
    let result = false;

    if (isFavorite == true) {
      // => Update to false
      result = await removeMyFavStore(token, storeID);
    } else {
      // => Update to true
      result = await addMyNewFavStore(token, storeID);
    }

    // if (result == true) {
    //   setFavorite(!isFavorite);
    // }
  };

  // Function: Go to Review screen
  const goReview = (sID, shopname, avatar, stars) => {
    let obj = {
      storeID: sID,
      shopName: shopname,
      avatarUrl: avatar,
      stars: stars
    };
    props.navigation.navigate("Review", obj);
  };

  // Render header (description of store)
  const renderHeader = () => {
    return (
      <>
        <Text style={styles.description}>{displayData.description}</Text>
      </>
    );
  };

  // Convert to a readable address
  const convertToShortAddress = fulladdr => {
    if (fulladdr) {
      let start = fulladdr.indexOf("Q") + 5;
      let end = fulladdr.indexOf(",", start);
      let district = fulladdr.substring(start, end);
      let result = "Quận " + district + ", TP. Hồ Chí Minh";
      return result;
    }
  };

  // Render view
  return (
    <View style={styles.container}>
      {/* ImageBox */}
      <View style={[styles.ImageBox, isLargeView ? { height: "30%" } : {}]}>
        <Image style={styles.bigPhoto} source={displayData.coverUrl} />
      </View>

      {/* InfoBox */}
      <View style={[styles.InfoBox, isLargeView ? { height: "80%" } : {}]}>
        {/* FavoriteBox */}
        <View style={styles.FavoriteBox}>
          <TouchableOpacity onPress={updateMyFavoriteStore}>
            <IconHeart
              width={36}
              height={36}
              fill={isFavorite == true ? "#F66767" : "#545454"}
            />
          </TouchableOpacity>
        </View>
        {/* Main info box (Name, address, cashback) */}
        <TouchableOpacity
          style={styles.shopMainInfo}
          onPress={() => setIsLargeView(!isLargeView)}
        >
          <Text style={styles.ShopName}>{displayData.name}</Text>
          <View style={styles.shopInfo}>
            <TouchableOpacity
              style={styles.rowDirection}
              onPress={() =>
                alert("Link to this address using Map: " + displayData.address)
              }
            >
              <IconCheckin width={26} height={26} fill={"#D8B05E"} />
              <Text style={styles.miniText}>
                {convertToShortAddress(displayData.address)}
              </Text>
            </TouchableOpacity>
            <View style={[styles.rowDirection, { marginTop: 15 }]}>
              <View style={{marginTop: -15}}>
              <IconOffer width={26} height={26} fill={"#D8B05E"} />
              </View>
              <Text style={[styles.miniText]}>{displayData.cashback}</Text>
            </View>
          </View>
        </TouchableOpacity>
        {/* Food item list */}
        <View style={styles.shopAdditionalInfo}>
          <FlatList
            contentContainerStyle={{
              paddingHorizontal: 15,
              alignItems: "center",
              justifyContent: "center"
            }}
            data={displayData.menu}
            ListHeaderComponent={renderHeader}
            renderItem={({ item }) => (
              <Item
                title={item.name}
                isBestSeller={item.isPopular == "1"}
                price={item.unitPrice}
                image={item.img}
              />
            )}
            keyExtractor={item => item.food_id.toString()}
          />
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

      {/* ReviewButtonBox */}
      <TouchableOpacity
        style={styles.ReviewButtonBox}
        onPress={() =>
          goReview(
            storeID,
            displayData.name,
            displayData.avatarUrl,
            displayData.stars
          )
        }
      >
        <Text style={styles.reviewText}>Review</Text>
      </TouchableOpacity>
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
    height: "50%" // fix đây 50 -> 30
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
    height: "60%", // fix đây 60 -> 80
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
    alignItems: "center",
    marginVertical: 5
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
  ReviewButtonBox: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "8%",
    backgroundColor: "#E9895D",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  errorText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"
  },
  errorButton: {
    backgroundColor: "#DC8D66",
    width: 60,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 5,
    borderColor: "#DC8D66",
    borderWidth: 1
  },
  errorTextButton: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  },
  reviewText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold"
  }
});

DetailScreen.navigationOptions = {
  header: null
};

export default DetailScreen;
