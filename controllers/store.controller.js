import { AsyncStorage } from "react-native";

import { getLocalData } from "./account.controller";

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

const getListRecommendStore = async (page, long, lat, props) => {
  const goDetail = storeID => {
    props.navigation.navigate("Detail", { storeID });
  };

  // console.log("getListRecommendStore đang chạy:");

  // gửi lên page, long, lat nhận list store
  var result = [];
  if (page === 1)
    for (let i = 0; i < 6; i++) {
      result.push({
        image: { uri: "http://sv.thanhlinhwedding.com/image-app/menu.jpg" },
        storeID: "123" + i,
        shop: "Otoké chicken",
        vote: 5,
        distance: long === -1 ? "deobiet" : "3.0",
        isLove: true,
        price: 30, // 30k
        onPressItem: storeID => goDetail(storeID)
      });
    }
  if (page === 2)
    result.push({
      image: { uri: "http://sv.thanhlinhwedding.com/image-app/menu.jpg" },
      storeID: "123" + 999,
      shop: "2222222",
      vote: 5,
      distance: long === -1 ? "deobiet" : "3.0",
      isLove: true,
      price: 30, // 30k
      onPressItem: storeID => goDetail(storeID)
    });
  if (page === 3)
    result.push({
      image: { uri: "http://sv.thanhlinhwedding.com/image-app/menu.jpg" },
      storeID: "1232222" + 999,
      shop: "33333",
      vote: 5,
      distance: long === -1 ? "deobiet" : "3.0",
      isLove: true,
      price: 30, // 30k
      onPressItem: storeID => goDetail(storeID)
    });
  if (page === 4)
    result.push({
      image: { uri: "http://sv.thanhlinhwedding.com/image-app/menu.jpg" },
      storeID: "xxxx" + 999,
      shop: "4444",
      vote: 5,
      distance: long === -1 ? "deobiet" : "3.0",
      isLove: true,
      price: 30, // 30k
      onPressItem: storeID => goDetail(storeID)
    });

  return result;
};

const getListBannerAndCategory = async () => {
  // Trả về obj gồm 2 array: banner và 5 category
  const result = {
    Banner: [
      {
        imageUrl: "xxxxxxxx.jpg",
        mShopID: "1234327"
      },
      {
        imageUrl: "xxxxxxxx.jpg",
        mShopID: "1234327"
      }
    ],
    Category: [
      {
        name: "Food"
      },
      {
        name: "Food"
      },
      {
        name: "Food"
      },
      {
        name: "Food"
      },
      {
        name: "Food"
      }
    ]
  };
  return result;
};

const getListStoreByKeyword = async (keyword, page, long, lat, props) => {
  // Trả về array shop sau khi search
  const goDetail = storeID => {
    props.navigation.navigate("Detail", { storeID });
  };

  console.log("getListStoreByKeyword đang chạy:");

  // gửi lên page, long, lat nhận list store
  var result = [];
  if (page === 1 && keyword === "Test")
    for (let i = 0; i < 6; i++) {
      result.push({
        image: { uri: "http://sv.thanhlinhwedding.com/image-app/menu.jpg" },
        storeID: "123" + i,
        shop: "test",
        vote: 5,
        distance: long === -1 ? "deobiet" : "3.0",
        isLove: true,
        price: 30, // 30k
        onPressItem: storeID => goDetail(storeID)
      });
    }

  return result;
};

export { getListRecommendStore, getListStoreByKeyword, getStoreDetail };
