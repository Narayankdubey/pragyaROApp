import { StyleSheet, Text, View, ImageBackground, Linking } from "react-native";
import React from "react";
import { Button, Headline, Title } from "react-native-paper";

const ServiceNow = () => {
  return (
    <View style={styles.serviceContainer}>
      <ImageBackground
        source={{ uri: "https://www.kent.co.in/images/static_bg.png" }}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <Headline>
          To Register your Service Request for your Pragya RO System Products
        </Headline>
        <Button icon="phone" onPress={() => Linking.openURL("tel:8920310622")}>
          89-203-10622
        </Button>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  serviceContainer: {
    height: "100%",
    // display: "flex",
    // justifyContent: "space-around",
    // alignItems: "center",
  },
  backgroundImage: {
    width: "100%",
    height: undefined,
  },
});

export default ServiceNow;
