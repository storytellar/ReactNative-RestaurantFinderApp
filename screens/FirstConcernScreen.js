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
  updateMyConcernList
} from "../controllers/account.controller";

const windowWidth = Dimensions.get("window").width;

const FirstConcernScreen = (props) => {
  const [loading, setLoading] = React.useState(true);
  const [concernList, setConcernList] = React.useState([]);
  const [refreshFlatlist, setRefreshFlatlist] = React.useState(false);
  
  React.useEffect(() => {
    getRawConcernListFunc()
  }, []);

  const getRawConcernListFunc = async () => {
    setLoading(true);

    let data = await getRawConcernList()
    if (data == null) {
      setLoading(false);  
      return
    }

    for (let i=0; i<data.length; ++i) {
      data[i]['isActive'] = false
    }

    setConcernList(data)
    setLoading(false);
  }

  const updateMyConcernListFunc = async () => {
    let resArr = []
    concernList.map((ele) => {
      if (ele.isActive == true) {
        resArr.push(ele.concern_id)
      }
    })
    await updateMyConcernList(resArr)
    props.navigation.navigate("EditInfo")
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
          onPress={() => updateMyConcernListFunc()}
        >
          <Text style={styles.buttonText}>Let's see offers</Text>
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
    alignItems: "center"
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
    fontSize: 18,
    color: "white",
    fontWeight: "bold"
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

FirstConcernScreen.navigationOptions = {
  header: null
};

export default FirstConcernScreen;
