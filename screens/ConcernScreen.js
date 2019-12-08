import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from "react-native";

import { 
  getRawConcernList,
  updateMyConcernList,
  getMyConcernList 
} from "../controllers/account.controller";

const windowWidth = Dimensions.get("window").width;

const ConcernScreen = props => {
  const [loading, setLoading] = React.useState(true);
  const [concernList, setConcernList] = React.useState([]);
  const [refreshFlatlist, setRefreshFlatlist] = React.useState(false);

  React.useEffect(() => {
    getAllDataFunc()
  }, []);

  const getAllDataFunc = async () => {
    setLoading(true)

    let data = await getRawConcernList()
    if (data == null) {
      setLoading(false); 
      return
    }

    for (let i=0; i<data.length; ++i) {
      data[i]['isActive'] = false
    }

    let myConcern = await getMyConcernList()
    if (myConcern == null) {
      setLoading(false)
      setConcernList(data)
      return
    }

    for (let i=0; i<data.length; ++i) {
      for (let j=0; j<myConcern.length; ++j) {
        if (data[i]['concern_id'] == myConcern[j]['concern_id']) {
          data[i]['isActive'] = true
        }
      }
    }

    setConcernList(data)
    setLoading(false)
  }

  const updateMyConcernListFunc = async () => {
    let resArr = []
    concernList.map((ele) => {
      if (ele.isActive == true) {
        resArr.push(ele.concern_id)
      }
    })
    await updateMyConcernList(resArr)
    props.navigation.navigate("Account")
  }

  const updateConcernStatus = (item) => {
    console.log(item)
    let data = concernList
    let posEle = parseInt(item.concern_id) - 1
    let isActive = data[posEle]['isActive']
    data[posEle]['isActive'] = !isActive
    setRefreshFlatlist(!refreshFlatlist)
  }

  const renderAllItemFlatList = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.concern_id}
        style={(item.isActive == true) ? styles.concernSelected : styles.concern}
        onPress={() => updateConcernStatus(item)}
      >
        <Text>{item.label}</Text>
      </TouchableOpacity>
    )
  }

  const renderHeader = () => {
    return (
      <View style={{ marginBottom: 30, marginTop: 30 }}>
        <Text style={{ fontSize: 36, fontWeight: "200", color: "#3C3D47" }}>
          What do you like?
        </Text>
      </View>
    )
  }

  const renderFooter = () => {
    return (
      <View style={{ marginTop: 30 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={updateMyConcernListFunc}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    )
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" loading={loading} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.container}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        data={concernList}
        extraData={refreshFlatlist}
        renderItem={renderAllItemFlatList}
        keyExtractor={item => item.concern_id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFCFA"
  },
  button: {
    paddingVertical: 15,
    width: windowWidth * 0.7,
    backgroundColor: "#DC8D66",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40
  },
  buttonText: {
    fontSize: 22,
    fontWeight: "400",
    color: "white"
  },
  concern: {
    margin: 3,
    width: windowWidth * 0.5,
    paddingVertical: 10,
    // backgroundColor: "#357376",
    borderWidth: 1,
    borderColor: "#3C3D47",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  concernSelected: {
    margin: 3,
    width: windowWidth * 0.5,
    paddingVertical: 10,
    backgroundColor: "#357376",
    borderWidth: 1,
    borderColor: "#3C3D47",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});

ConcernScreen.navigationOptions = {
  header: null
};

export default ConcernScreen;
