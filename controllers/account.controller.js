import { AsyncStorage } from "react-native";
//
// AsyncStorage uses:
// @account: data of user logon
//
const getLocalData = async () => {
  try {
    const value = await AsyncStorage.getItem("@account");
    return value;
  } catch (error) {
    return false;
  }
};

const saveProfile = async (token, info) => {
  var res = await fetch(
    "https://a8aeksd7j1.execute-api.us-east-2.amazonaws.com/dev/register/detail",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Origin: "http://localhost:19002",
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "content-type",
        "Access-Control-Request-Method": "POST"
      },
      body: JSON.stringify({
        "username": info.username,
        "name": info.nameValue,
        "city": info.cityValue,
        "age": parseInt(info.ageValue),
        "job": info.jobValue,
        "gender": info.genderValue,
        "salaryRange": `${info.incomeValue}`
      })
    }
  );
  var resData = await res.json();

  if (resData.statusCode === 200) {
    // Nếu save profile thành công
    await getProfile(token)
  }
};

// Trả về full info profile
const getProfile = async token => {
  var res = await fetch(
    "https://a8aeksd7j1.execute-api.us-east-2.amazonaws.com/dev/profile",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Origin: "http://localhost:19002",
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "content-type",
        "Access-Control-Request-Method": "POST",
        Authorization: token
      }
    }
  );
  var resData = await res.json();

  if (resData.statusCode === 200) {
    // Nếu lấy profile thành công
    var data = {
      token: token,
      info: resData.data
    };

    try {
      await AsyncStorage.setItem("@account", JSON.stringify(data));
    } catch (error) {}

    return resData.data;
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
        Origin: "http://localhost:19002",
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

  if (resData.data.token) {
    // Nếu đăng nhập thành công
    var data = {
      token: resData.data.token
    };

    try {
      await AsyncStorage.setItem("@account", JSON.stringify(data));
    } catch (error) {}

    getProfile(data.token);
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
        Origin: "http://localhost:19002",
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

  if (resData.statusCode === 200) return true;
  return false;
};

const logout = async () => {
  try {
    await AsyncStorage.removeItem("@account");
  } catch (error) {}
};

export { getLocalData, newLogin, newSignup, logout, saveProfile, getProfile };
