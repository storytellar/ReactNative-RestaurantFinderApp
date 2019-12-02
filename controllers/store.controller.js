import { getLocalData } from "./account.controller";
let restAPI = require('./restAPI.controller');

const getStoreDetail = async storeid => {
  console.log(`[getStoreDetail] đang chạy`);
  data = await getLocalData();
  data = JSON.parse(data);
  console.log("TOKEN:" + data.token);

  
  // Trả về toàn bộ info làm trang detail shop
  var result = {
    isOK: true, // fetch không bị lỗi
    token: data.token,
    imageUrl: "http://sv.thanhlinhwedding.com/image-app/BigImage.jpg",
    isFavorite: "true",
    name: "Otoké chicken",
    address: "Quận 5, TP. HCM",
    cashback: "Hoàn tiền 10% từ MOMO",
    description:
      "Otoké trong tiếng Hàn Quốc nghĩa là «Wow» hay «Làm sao đây?» Và đó cũng chính là cảm giác mà chúng tôi muốn mang đến cho người yêu ẩm thực khi thưởng thức món gà rán trứ danh.",
    menu: [
      {
        title: "Đùi gà siêu giòn",
        isBestSeller: "true",
        price: "30",
        image: { uri: "http://sv.thanhlinhwedding.com/image-app/menu.jpg" }
      },
      {
        title: "Cơm cánh gà rán",
        isBestSeller: "true",
        price: "30",
        image: { uri: "http://sv.thanhlinhwedding.com/image-app/menu.jpg" }
      },
      {
        title: "Cơm cá phi lê",
        isBestSeller: "false",
        price: "30",
        image: { uri: "http://sv.thanhlinhwedding.com/image-app/menu.jpg" }
      },
      {
        title: "Combo cơm trưa",
        isBestSeller: "false",
        price: "30",
        image: { uri: "http://sv.thanhlinhwedding.com/image-app/menu.jpg" }
      },
      {
        title: "Cơm gà siêu cay",
        isBestSeller: "false",
        price: "30",
        image: { uri: "http://sv.thanhlinhwedding.com/image-app/menu.jpg" }
      }
    ]
  };
  return result;
};









//-----------------------------------------------------------

// Convert long name to short name with "..."
const convertLongToShortName = (str) => {
  let newStr = str
  if (newStr.length > 12) {
    newStr = newStr.slice(0, 12)
    newStr += "..."
  }
  return newStr
}

// Get store list by keyword
// Params: String token, String searchType ("store"), String page, String lat, String long, Props
// Result: Store array | Null
const getListStoreByKeyword = async (token, searchType, keyword, page, lat, long, props) => {
  if (searchType != "store") return null

  let uri = `search?type=store&keyword=${keyword}&page=${page}&lat=${lat}&lng=${long}`
  let data = await restAPI.getMethod(token, uri)

  const goDetail = storeID => {
    props.navigation.navigate("Detail", { storeID });
  };

  if (data == null) return null

  for (let i=0; i<data.length; ++i) {
    // Process long store name
    data[i]['store_name'] = convertLongToShortName(data[i]['store_name'])

    // Add new key onPressItem
    sID = data[i]['store_id']
    data[i]['onPressItem'] = (sID) => goDetail(sID)

    // Convert key imgLink to object "uri imgLink"
    imgLink = data[i]['imgLink']
    data[i]['imgLink'] = { uri: imgLink }
  }

  return data;
};

// Get food list by keyword
// Params: String token, String searchType ("food"), String page, String lat, String long, Props
// Result: Food array | Null
const getListFoodByKeyword = async (token, searchType, keyword, page, lat, long, props) => {
  if (searchType != "food") return null

  let uri = `search?type=food&keyword=${keyword}&page=${page}&lat=${lat}&lng=${long}`
  let data = await restAPI.getMethod(token, uri)

  const goDetail = storeID => {
    props.navigation.navigate("Detail", { storeID });
  };

  if (data == null) return null

  for (let i=0; i<data.length; ++i) {
    // Process long store name
    data[i]['store_name'] = convertLongToShortName(data[i]['store_name'])

    // Process long food name
    data[i]['name'] = convertLongToShortName(data[i]['name'])

    // Add new key onPressItem
    sID = data[i]['store_id']
    data[i]['onPressItem'] = (sID) => goDetail(sID)

    // Convert key imgLink to object "uri imgLink"
    img = data[i]['img']
    data[i]['img'] = { uri: img }
  }

  return data;
};

// Get all banners
// Params: String token
// Result: List of banner | Null
const getBanners = async token => {
  return (await restAPI.getMethod(token, "banner"));
};

// Get all categories
// Params: String token
// Result: List of category | Null
const getCategory = async token => {
  let rawList = await restAPI.getMethod(token, "concern/rawlist")
  if (rawList == null) return null

  let myList = await restAPI.getMethod(token, "concern/mylist")
  if (myList == null) {
    // rawList > 5 => Pop element to 5
    while (rawList.length > 5) {
      rawList.pop()
    }
    return rawList
  }
  else {
    // myList > 5 => Pop element to 5
    while (myList.length > 5) {
      myList.pop()
    }

    // myList = 5 => Return
    if (myList.length == 5) return myList
    
    // myList < 5 => Add more element of rawList to myList => Return
    for (let i=0; i<rawList.length; ++i) {
      let rID = rawList[i]['concern_id']
      let isEq = false
      for (let j=0; j<myList.length; ++j) {
        let mID = myList[j]['concern_id']
        if (rID == mID) {
          isEq = true
          break
        }
      }
      if (isEq == false) {
        myList.push(rawList[i])
      }
      if (myList.length == 5) {
        return myList
      }
    }
  }
};

// Get suggestive store list
// Params: String token, String page, String lat, String long, Props
// Result: Store array | Null
const getListRecommendStore = async (token, page, lat, long, props) => {
  let uri = `suggest?type=store&page=${page}&lat=${lat}&lng=${long}`
  let data = await restAPI.getMethod(token, uri)

  const goDetail = (storeID) => {
    props.navigation.navigate("Detail", { storeID });
  };

  if (data == null) return null

  for (let i=0; i<data.length; ++i) {
    // Process long store name
    data[i]['store_name'] = convertLongToShortName(data[i]['store_name'])

    // Add new key onPressItem
    sID = data[i]['store_id']
    data[i]['onPressItem'] = (sID) => goDetail(sID)

    // Convert key imgLink to object "uri imgLink"
    imgLink = data[i]['imgLink']
    data[i]['imgLink'] = { uri: imgLink }
  }

  return data
};

// Get suggestive food list
// Params: String token, String page, String lat, String long, Props
// Result: Food array | Null
const getListRecommendFood = async (token, page, lat, long, props) => {
  let uri = `suggest?type=food&page=${page}&lat=${lat}&lng=${long}`
  let data = await restAPI.getMethod(token, uri)

  const goDetail = (storeID) => {
    props.navigation.navigate("Detail", { storeID });
  };

  if (data == null) return null

  for (let i=0; i<data.length; ++i) {
    // Add new key onPressItem
    sID = data[i]['store_id']
    data[i]['onPressItem'] = (sID) => goDetail(sID)

    // Convert key img to object "uri img"
    img = data[i]['img']
    data[i]['img'] = { uri: img }
  }

  return data
};

export {  getListRecommendStore, 
          getListRecommendFood,
          getListStoreByKeyword, 
          getListFoodByKeyword,
          getStoreDetail,
          getBanners,
          getCategory };
