import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  AsyncStorage,
  Image,
  Modal,
  TextInput,
  Keyboard,
  Platform
} from "react-native";

import {
  getReviewListOfStore,
  postMyReviewForStore
} from "../controllers/store.controller";

import Comment from "../components/Comment";
import IconLeft from "../assets/svg/left.svg";

const windowWidth = Dimensions.get("window").width;
import IconStar from "../assets/svg/rate.svg";
import { FlatList } from "react-native-gesture-handler";

const ReviewShop = props => {
  // Declare hook
  const [text, setText] = React.useState("");
  const [reviewStar, setReviewStar] = React.useState(0);
  const [boxStatus, setBoxStatus] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [reviewList, setReviewList] = React.useState([]);
  const [allowReview, setAllowReview] = React.useState(false);
  const [modalNote, setModalNote] = React.useState("You can only review one time, and a review must have stars and comment")

  // Declare global variable
  let storeID = props.navigation.getParam("storeID")
  let shopName = props.navigation.getParam("shopName")
  let vote = props.navigation.getParam("stars")
  let avatarUrl = props.navigation.getParam("avatarUrl")

  // First running => Get review list of this store
  React.useEffect(() => {
    loadReviewList()
  }, []);

  // Load review list of this store
  const loadReviewList = async () => {
    setLoading(true);

    let account = JSON.parse(await AsyncStorage.getItem("@account"))
    let token = account.token;
    let username = account.info.username

    let data = await getReviewListOfStore(token, storeID)
    if (data == null) {
      setAllowReview(true);
      setLoading(false);
      return
    }

    let userPosition = -1
    for (let i=0; i<data.length; ++i) {
      let obj = data[i]
      if (username == obj.username) {
        userPosition = i
        break
      }
    }

    if (userPosition == -1) {
      setAllowReview(true);
    }
    else
      if (userPosition != 0) {
        let obj = data[0]
        let userObj = data[userPosition]
        data[0] = userObj
        data[userPosition] = obj
      }

    setReviewList(data)
    setLoading(false);
  }

  // Loading...
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" loading={loading} />
      </View>
    )
  }

  // Parse value of "vote"
  if (parseInt(vote) > 1 && parseInt(vote) <= 5)
    var votes = [...Array(parseInt(vote) - 1).keys()];
  else if (parseInt(vote) > 5) var votes = [...Array(4).keys()];
  else var votes = [...Array(0).keys()];
  
  var votesBlack = [...Array(5 - parseInt(vote)).keys()];

  // Render stars of rating modal
  const renderStarsModal = () => {
    let arr = [1, 2, 3, 4, 5]
    return (
      <>
        {
          arr.map((val) => {
            return (
              <TouchableOpacity
                key={val}
                style={{ marginLeft: 10 }}
                onPress={() => setReviewStar(val)}
              >
                <IconStar
                  width={40}
                  height={40}
                  fill={reviewStar >= val ? "#fffd64" : "#584b42"}
                />
              </TouchableOpacity>
            )
          })
        }
      </>
    )
  }

  // Post new review
  const postNewReview = async () => {
    if (reviewStar == 0 || text.length == 0) {
      setModalNote("Stars and comment must not be empty, please review something")
      return
    }

    let token = JSON.parse(await AsyncStorage.getItem("@account")).token;
    let result = await postMyReviewForStore(token, storeID, text, reviewStar)
    if (!result) {
      setModalNote("Server is not responding now, please try again later")
      return
    }

    setAllowReview(false)
    setBoxStatus(false);
    await loadReviewList()
  }

  // Render view
  return (
    <SafeAreaView style={styles.container}>
      {/* Back button */}
      <View>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <View style={styles.GoBackButton}>
            <IconLeft width={20} height={20} fill={"#545454"} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Header */}
      <View style={styles.header}>
        {/* Avatar of store */}
        <View style={styles.ImageBox}>
          <Image style={styles.bigPhoto} source={avatarUrl} />
        </View>
        {/* Shop name & stars/votes */}
        <View style={{ marginLeft: windowWidth * 0.05, justifyContent: "center" }}>
          {/* Shop name */}
          <Text
            style={{
              color: "#181D2E",
              fontSize: 24,
              fontWeight: "600",
              width: windowWidth * 0.5
            }}
          >
            {shopName}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* Stars */}
            <Text style={{ fontSize: 24, fontWeight: "600", color: "#E08E3A" }}>
              {vote}
            </Text>
            <View style={{ marginLeft: 10 }}>
              <IconStar width={14} height={14} fill={"#DC8D66"} />
            </View>
            {
              // Orange votes (icon)
              votes.map(vote => {
                return (
                  <View style={{ marginLeft: 10 }} key={vote}>
                    <IconStar width={14} height={14} fill={"#DC8D66"} />
                  </View>
                );
              })
            }
            {
              // Black votes (icon)
              votesBlack.map(vote => {
                return (
                  <View style={{ marginLeft: 10 }} key={vote}>
                    <IconStar width={14} height={14} fill={"grey"} />
                  </View>
                );
              })
            }
          </View>
        </View>
      </View>
        
      {/* Button to open Modalbox for reviewing (Only run when user hasn't review current store before) */}
      {
        (allowReview == true) ?
        (
          <View style={{ alignItems: "center", marginVertical: 10 }}>
            <View
              style={{
                height: 80,
                width: windowWidth * 0.87,
                backgroundColor: "#ffdbc5",
                borderRadius: 10,
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              <View style={{ flex: 0.6 }}>
                <Text
                  style={{
                    marginHorizontal: windowWidth * 0.05,
                    color: "#181D2E",
                    fontSize: 16,
                    fontWeight: "400"
                  }}
                >
                  Have you come here?
                </Text>
              </View>
              <View style={{ flex: 0.4 }}>
                <TouchableOpacity
                  style={{
                    height: 40,
                    width: 120,
                    backgroundColor: "#ff9d76",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10
                  }}
                  onPress={() => setBoxStatus(true)}
                >
                  <Text
                    style={{ color: "#FFFCFA", fontSize: 16, fontWeight: "400" }}
                  >
                    Review
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) :
        (
          <></>
        )
      }

      {/* Comment list */}
      <View style={{ alignItems: "center", flex: 1, marginTop: 20 }}>
        <View style={styles.comments}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={reviewList}
            renderItem={({ item }) => (
              <Comment
                key={item.review_id}
                name={item.name}
                comment={item.text}
              />
            )}
            keyExtractor={item => item.review_id}
          />
        </View>
      </View>
      
      {/* Modalbox for reviewing */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={boxStatus}
        onRequestClose={() => { Alert.alert("Modal has been closed."); }}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalOverview}>
            <View style={styles.modalInsideView}>
              {/* Modal: Title */}
              <Text style={styles.modalTitle}>
                REVIEW
              </Text>
              
              {/* Note */}
              <Text style={styles.modalNote}>
                {
                  modalNote
                }
              </Text>

              {/* Modal: Stars */}
              <View style={styles.modalStarsBox}>
                {
                  renderStarsModal()
                }
              </View>

              {/* Modal: Comment box */}
              <View style={styles.commentBox}>
                <TextInput
                  style={styles.comment}
                  placeholder="Write your review..."
                  onChangeText={text => setText(text)}
                  value={text}
                  keyboardType="default"
                  returnKeyType="done"
                  multiline={true}
                  blurOnSubmit={true}
                  onSubmitEditing={() => { Keyboard.dismiss() }}
                />
              </View>

              {/* Modal: Action buttons */}
              <View style={{ flexDirection: "row" }}>
                {/* Modal: Cancel button */}
                <TouchableOpacity
                  style={styles.modalCancelButton}
                  onPress={() => setBoxStatus(false)}
                >
                  <Text style={styles.modalCancelText}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                {/* Modal: Send button */}
                <TouchableOpacity
                  style={styles.modalSendButton}
                  onPress={() => postNewReview()}
                >
                  <Text style={styles.modalSendText}>
                    Send
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

ReviewShop.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#FFFCFA",
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  header: {
    flexDirection: "row",
    marginHorizontal: windowWidth * 0.07,
    marginVertical: 10
  },
  ImageBox: {
    width: 120,
    height: 120,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  bigPhoto: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 60,
    borderWidth: 0.5,
    borderColor: "#181D2E"
  },
  GoBackButton: {
    marginLeft: windowWidth * 0.02,
    width: 45,
    height: 48,
    alignItems: "center",
    justifyContent: "center"
  },
  comments: {
    width: windowWidth * 0.87
    // backgroundColor: "red"
  },
  comment: {
    width: 0.6 * windowWidth,
    fontSize: 18,
    fontWeight: "400",
    color: "#575460"
  },
  commentBox: {
    width: 0.7 * windowWidth,
    height: 140, 
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "gray",
    borderRadius: 18,
    backgroundColor: "#f9f9fa",

    shadowColor: "#D8BCA8",
    shadowOffset: {
      width: -1,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,

    elevation: 1
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  modalOverview: {
    width: windowWidth * 0.8,
    height: 400,
    backgroundColor: "#e28a62",
    borderRadius: 20,

    shadowColor: "#537d91",
    shadowOffset: {
      width: -2,
      height: 7
    },
    shadowOpacity: 0.8,
    shadowRadius: 9.51,

    elevation: 15
  },
  modalInsideView: {
    margin: 10, 
    alignItems: "center", 
    justifyContent: "center"
  },
  modalTitle: { 
    fontSize: 28, 
    fontWeight: "600", 
    color: "white", 
    marginTop: 15, 
    marginBottom: 5 
  },
  modalNote: {
    fontSize: 14,
    fontStyle: "italic",
    color: "white",
    marginTop: 5,
    marginBottom: 15,
    marginHorizontal: 10,
    textAlign: "center"
  },
  modalStarsBox: { 
    flexDirection: "row", 
    marginBottom: 20 
  },
  modalCancelButton: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15
  },
  modalCancelText: {
    color: "#FFFCFA",
    fontSize: 16,
    fontWeight: "400"
  },
  modalSendButton: {
    height: 40,
    width: 100,
    backgroundColor: "#478e8b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  modalSendText: {
    color: "#FFFCFA",
    fontSize: 16,
    fontWeight: "400"
  }
});

export default ReviewShop;
