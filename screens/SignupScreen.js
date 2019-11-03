import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions
} from "react-native";

import IconUser from "../assets/svg/user.svg";
import IconPass from "../assets/svg/pass.svg";
import IconSignup from "../assets/svg/signup.svg";

const windowWidth = Dimensions.get("window").width;

const SignupScreen = (props) => {
    return (
        <SafeAreaView style={styles.container}>
        <IconSignup width={200} height={200} />
  
        {/* TÀI KHOẢN */}
        <View style={styles.searchBoxWrapper}>
          <View style={styles.searchButton}>
            <IconUser width={32} height={32} />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            onChangeID={text => onChangeID(text)}
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
            placeholder="Enter your password"
            onChangePass={text => onChangePass(text)}
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
            placeholder="Re-enter your password"
            onChangePass={text => onChangePass(text)}
          />
        </View>
  
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => props.navigation.navigate("Recommend")}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
  
        <View style={{ flexDirection: "row", marginTop: 30 }}>
          <Text style={{ fontSize: 16, color: "#888" }}>
           Already a member?
          </Text>
          <TouchableOpacity 
                  onPress={() => props.navigation.navigate("Login")}
          >
            <Text style={{ fontSize: 16, color: "#E9895D" }}> Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    
    )
}

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
      backgroundColor: "#E9895D",
      width: 200,
      height: 52,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 40
    },
    buttonText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "white"
    }
  });

export default SignupScreen
