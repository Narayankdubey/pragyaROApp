import { StyleSheet, Text, View } from "react-native";
import React from "react";

const NoDataFound = () => {
  return (
    <View style={styles.container}>
      <Text> !! No Data Found !!</Text>
    </View>
  );
};

export default NoDataFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
