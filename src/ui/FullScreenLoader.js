import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";

const FullScreenLoader = () => {
  const { filterElementLoader } = useSelector((state) => state.ui);
  return (
    filterElementLoader && (
      <View style={[styles.loadingContainer, { display: "flex" }]}>
        <ActivityIndicator
          animating={filterElementLoader}
          size={60}
          color={Colors.red800}
          // style={{ display: display}}
        />
      </View>
    )
  );
};

export default FullScreenLoader;

const styles = StyleSheet.create({
  loadingContainer: {
    // flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    opacity: 0.6,
    // zIndex: 9999,
  },
});
