import { AsyncStorage } from "react-native";
//
// AsyncStorage uses:
// @account: data of user logon
//

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("@account");
    return value;
  } catch (error) {
    return false;
  }
};

// Trả về token
const newLogin = async (id, pass) => {
  var res = await fetch(
    "https://a8aeksd7j1.execute-api.us-east-2.amazonaws.com/dev/login",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Origin": "http://localhost:19002",
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "content-type",
        "Access-Control-Request-Method": "POST"
      },
      body: JSON.stringify({
        username: id.toString(),
        password: pass.toString()
      })
    }
  );
  var resData = await res.json();
    debugger
  if (resData.data.token){
    // Nếu đăng nhập thành công
    var data = {
      token: resData.data.token,
    };
  
    try {
      await AsyncStorage.setItem("@account", JSON.stringify(data));
    } catch (error) {}

    return resData.data.token;
  }
};

const newSignup = async (id, pass) => {
  var res = await fetch(
    "https://a8aeksd7j1.execute-api.us-east-2.amazonaws.com/dev/register",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Origin": "http://localhost:19002",
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "content-type",
        "Access-Control-Request-Method": "POST"
      },
      body: JSON.stringify({
        username: id.toString(),
        password: pass.toString()
      })
    }
  );
  var resData = await res.json();

  if (resData.statusCode === 200)
    return true;
  return false;
};

const logout = async () => {
  try {
    await AsyncStorage.removeItem("@account");
  } catch (error) {}
};

export { getData, newLogin, newSignup, logout };
