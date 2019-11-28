import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { setRecoveryProps } from "expo/build/ErrorRecovery/ErrorRecovery";

const windowWidth = Dimensions.get("window").width;

const ConcernScreen = (props) => {
  const [isCoffee, setCoffee] = React.useState(false);
  const [isBuffet, setBuffet] = React.useState(false);
  const [isVegetarian, setVegetarian] = React.useState(false);
  const [isAffodable, setAffodable] = React.useState(false);
  const [isBakery, setBakery] = React.useState(false);
  const [isOthers, setOthers] = React.useState(false);

  const buildConcern = () => {
      return {isCoffee, isBuffet, isVegetarian, isAffodable, isBakery, isOthers}
  }

  console.log(buildConcern());
  

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 36, fontWeight: "200", color: "#3C3D47" }}>
        What do you like?
      </Text>
      <View style={{ marginBottom: 50, marginTop: 20 }}>
        <TouchableOpacity
          style={isCoffee ? styles.concernSelected : styles.concern}
          onPress={() => setCoffee(!isCoffee)}
        >
          <Text>Coffee & Dessert</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={isBuffet ? styles.concernSelected : styles.concern}
          onPress={() => setBuffet(!isBuffet)}
        >
          <Text>Buffet/Luxury Restaurant</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={isVegetarian ? styles.concernSelected : styles.concern}
          onPress={() => setVegetarian(!isVegetarian)}
        >
          <Text>Vegetarian</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={isAffodable ? styles.concernSelected : styles.concern}
          onPress={() => setAffodable(!isAffodable)}
        >
          <Text>Affodable Restaurant</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={isBakery ? styles.concernSelected : styles.concern}
          onPress={() => setBakery(!isBakery)}
        >
          <Text>Bakery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={isOthers ? styles.concernSelected : styles.concern}
          onPress={() => setOthers(!isOthers)}
        >
          <Text>Others</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={ () => { props.navigation.navigate("Account")}
      }>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
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
    fontWeight: '400',
    color: "white",
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
