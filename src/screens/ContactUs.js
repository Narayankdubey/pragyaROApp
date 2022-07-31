import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { Title, Headline } from "react-native-paper";

const ContactUs = () => {
  return (
    <View style={styles.ContactUsContainer}>
      <Headline>Call : 8920310622</Headline>
      <Title style={styles.titleStyle}>
        <Headline>Address : </Headline>
        <Title>
          Krishna Vihar, Gathola Road, Lakh No.11, Near Mahavir Mandir, Bahiro,
          Ara, Bhojpur, Bihar
        </Title>
      </Title>
    </View>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  ContactUsContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  titleStyle: {
    textAlign: "center",
  },
});
