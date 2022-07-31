import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";

const ProductSkeleton = () => {
  const { skeleton } = useSelector((state) => state.ui);
  return (
    <View
      style={[styles.loadingContainer, { display: skeleton ? "flex" : "none" }]}
    >
      <ActivityIndicator
        animating={skeleton}
        size={30}
        color={Colors.red800}
        // style={{ display: display}}
      />
    </View>
  );
};

export default ProductSkeleton;

const styles = StyleSheet.create({
  loadingContainer: {
    // width: "100%",
    // height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
