import {AsyncStorage} from 'react-native'
//
// AsyncStorage uses:
// @account: data of user logon
//

const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('@account');
        return value;
      } catch (error) {
        return false;
      }
};

const newLogin = async (id,pass) => {
  //B1: fetch(id,pass,api) => response data
  // if data.status != OK thì return;
  var data = {
    id: 1,
    name: "Nguyễn Mạnh Hùng",
    avatar: 'link',
  };

  try {
    await AsyncStorage.setItem('@account', JSON.stringify(data));
    
  } catch (error) {
    
  }

};

const logout = async () => {
  try {
    await AsyncStorage.removeItem('@account');
  } catch (error) {
  }
}

export {getData, newLogin, logout};