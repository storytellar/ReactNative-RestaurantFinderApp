import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";

import { getLocalData, saveProfile , getProfile} from "../controllers/account.controller";

const windowWidth = Dimensions.get("window").width;

const EditInfoAccountScreen = props => {
  const [loading, setLoading] = React.useState(true);
  const [localAccountInfo, setLocalAccountInfo] = React.useState({
    info: { name: "" }
  });

  const [nameValue, onChangeName] = React.useState("");
  const [genderValue, onChangeGender] = React.useState("");
  const [ageValue, onChangeAge] = React.useState("");
  const [jobValue, onChangeJob] = React.useState("");
  const [cityValue, onChangeCity] = React.useState("");
  const [incomeValue, onChangeIncome] = React.useState("");  

  const getAccountData = async () => {
    setLoading(true);
    var data = await getLocalData();
    data = JSON.parse(data);
    setLocalAccountInfo(data);
    onChangeName(data.info.name);
    onChangeGender(data.info.gender);
    onChangeAge(String(data.info.age) === "null" ? "" : String(data.info.age));
    onChangeJob(data.info.job);
    onChangeCity(data.info.city);
    onChangeIncome(String(data.info.salary_range) === "null" ? "" : String(data.info.salary_range));
    setLoading(false);
  };

  React.useEffect(() => {
    getAccountData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" loading={loading} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontSize: 32,
          color: "#b5534b",
          fontWeight: "400",
          marginRight: 10
        }}
      >
        ABOUT ME
      </Text>
      <KeyboardAvoidingView
        style={styles.inputWrapper}
        behavior="padding"
        enabled
        keyboardVerticalOffset={70}
      >
        <View style={styles.inputBox}>
          <View style={styles.labelBox}>
            <Text style={styles.label}>Name</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="John..."
            onChangeText={text => onChangeName(text)}
            value={nameValue}
          />
        </View>
        <View style={styles.inputBox}>
          <View style={styles.labelBox}>
            <Text style={styles.label}>Gender</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Male..."
            onChangeText={text => onChangeGender(text)}
            value={genderValue}
          />
        </View>
        <View style={styles.inputBox}>
          <View style={styles.labelBox}>
            <Text style={styles.label}>Age</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="18..."
            onChangeText={text => onChangeAge(text)}
            value={ageValue}
          />
        </View>
        <View style={styles.inputBox}>
          <View style={styles.labelBox}>
            <Text style={styles.label}>Job title</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Freelancer..."
            onChangeText={text => onChangeJob(text)}
            value={jobValue}
          />
        </View>
        <View style={styles.inputBox}>
          <View style={styles.labelBox}>
            <Text style={styles.label}>City</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Ho Chi Minh..."
            onChangeText={text => onChangeCity(text)}
            value={cityValue}
          />
        </View>
        <View style={styles.inputBox}>
          <View style={styles.labelBox}>
            <Text style={styles.label}>Income</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="12000000..."
            onChangeText={text => onChangeIncome(text)}
            value={incomeValue}
          />
        </View>
      </KeyboardAvoidingView>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Account")}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={ async () => {
             saveProfile(localAccountInfo.token, {
              nameValue,
              genderValue,
              ageValue,
              jobValue,
              cityValue,
              incomeValue,
              username: localAccountInfo.info.username
            });
            props.navigation.navigate("Account", {name : nameValue, city: cityValue});
          }}
        >
          <Text style={styles.submitText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

EditInfoAccountScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFCFA"
  },
  inputWrapper: {},
  inputBox: {
    width: 0.82 * windowWidth,
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
    height: 50,
    borderColor: "gray",
    borderRadius: 18,
    backgroundColor: "#f9f9fa",
    paddingLeft: 15,
    shadowColor: "#D8BCA8",
    shadowOffset: {
      width: -2,
      height: 4
    },
    shadowOpacity: 1,
    shadowRadius: 8,

    elevation: 1
  },
  labelBox: {
    backgroundColor: "#E9815D",
    width: 100,
    height: 50,
    marginLeft: -15,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18
  },
  label: {
    fontSize: 18,
    fontWeight: "400",
    color: "#faeee7"
  },
  input: {
    width: 0.5 * windowWidth,
    paddingLeft: 15,
    fontSize: 18,
    fontWeight: "400",
    color: "#575460"
  },
  buttonWrapper: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  skipText: {
    fontSize: 17,
    color: "#b5534b",
    fontWeight: "300",
    marginRight: 10,

    shadowColor: "#D8BCA8",
    shadowOffset: {
      width: -2,
      height: 4
    },
    shadowOpacity: 1,
    shadowRadius: 8,

    elevation: 1
  },
  submitText: {
    fontSize: 17,
    color: "#f8f8f8",
    fontWeight: "500"
  },
  submitButton: {
    backgroundColor: "#E9815D",
    padding: 10,
    borderRadius: 8,

    shadowColor: "#D8BCA8",
    shadowOffset: {
      width: -2,
      height: 4
    },
    shadowOpacity: 1,
    shadowRadius: 8,

    elevation: 1
  }
});

export default EditInfoAccountScreen;
