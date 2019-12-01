import React from "react";
import { View, Text, StyleSheet } from "react-native";

import ItemDetail from "../components/ItemDetail.js";
import SafeAreaView from "react-native-safe-area-view";

const _thaiScreen = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ItemDetail
        title="Tên món ở đây"
        shop="Tên shop"
        price={30}
        isLove={true}
        vote={5}
        image={{ uri: "http://sv.thanhlinhwedding.com/image-app/menu.jpg" }}
        onPressItem={() => alert("Thông báo xuất hiện sau khi PRESS")}
      />
    </SafeAreaView>
  );
};

export default _thaiScreen;
