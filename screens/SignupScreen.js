import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";

import { newLogin, newSignup } from "../controllers/account.controller";

import IconUser from "../assets/svg/user.svg";
import IconPass from "../assets/svg/pass.svg";
import IconSignup from "../assets/svg/signup.svg";

const windowWidth = Dimensions.get("window").width;

const SignupScreen = props => {
  const [errorSignup, setErrorSignup] = React.useState(false);
  const [id, onChangeID] = React.useState("");
  const [pass, onChangePass] = React.useState("");
  const [isClicked, setIsClicked] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ActivityIndicator animating={isClicked} size="large" color="#aaa" />
        <IconSignup width={200} height={200} />
        <Text>{errorSignup ? "👉Please enter another username" : ""}</Text>

        {/* TÀI KHOẢN */}
        <View style={styles.searchBoxWrapper}>
          <View style={styles.searchButton}>
            <IconUser width={32} height={32} />
          </View>
          <TextInput
            style={styles.input}
            placeholder="New username"
            onChangeText={text => onChangeID(text)}
          />
        </View>

        {/* MẬT KHẨU */}
        <View style={styles.searchBoxWrapper}>
          <View style={styles.searchButton}>
            <IconPass width={32} height={32} />
          </View>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="New password"
            onChangeText={text => onChangePass(text)}
          />
        </View>

        <TouchableOpacity
          style={isClicked ? styles.disableButton : styles.loginButton}
          onPress={async () => {
            await setIsClicked(true);
            if (await newSignup(id, pass)) {
              if (await newLogin(id, pass)){
              await props.navigation.navigate("Main");
            }
            } else {
              await setErrorSignup(true);
              setTimeout(function() {
                setErrorSignup(false);
              }, 3000);
              await setIsClicked(false);
            }
          }}
        >
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", marginTop: 30 }}>
          <Text style={{ fontSize: 16, color: "#888" }}>Already a member?</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
            <Text style={{ fontSize: 16, color: "#E9895D" }}> Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFCFA"
  },
  searchBoxWrapper: {
    width: 0.82 * windowWidth,
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    height: 60,
    borderColor: "gray",
    borderRadius: 18,
    backgroundColor: "white",
    paddingHorizontal: 15,

    justifyContent: "space-between",

    shadowColor: "#D8BCA8",
    shadowOffset: {
      width: -2,
      height: 4
    },
    shadowOpacity: 10,
    shadowRadius: 10,

    elevation: 7
  },
  input: {
    width: 0.82 * windowWidth - 80,
    fontSize: 18,
    fontWeight: "400",
    color: "#3C3D47"
  },
  loginButton: {
    marginTop: 30,
    backgroundColor: "#89ad91",
    width: 0.82 * windowWidth,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  },
  disableButton: {
    marginTop: 30,
    backgroundColor: "#d5d5d5",
    width: 0.82 * windowWidth,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18
  }
});

export default SignupScreen;
