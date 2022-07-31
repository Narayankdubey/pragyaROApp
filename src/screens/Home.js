import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import React from "react";
import { Headline, Title, Surface, Button } from "react-native-paper";

const Home = ({ navigation }) => {
  return (
    <View style={styles.homeMainContainer}>
      <ScrollView
        style={styles.homeContainer}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.bannerStyle}>
          <Headline>Buy Water Purifiers </Headline>
          <Headline>At Lowest Price</Headline>
          <Image
            source={{
              uri: "https://www.kent.co.in/images/banner/mobile-banner-product.webp",
            }}
            style={styles.bannerImgStyle}
          />
          <Title>Best Place to Buy</Title>
          <View style={styles.bannerButton}>
            <Button
              icon="phone"
              mode="contained"
              color="#9c27b0"
              onPress={() => Linking.openURL("tel:8920310622")}
            >
              8920310622
            </Button>
            <Button
              icon="whatsapp"
              mode="contained"
              color="#2e7d32"
              onPress={() =>
                Linking.openURL(
                  "https://wa.me/918920310622?text=I'm%20interested"
                )
              }
            >
              Whatsapp
            </Button>
          </View>
        </View>
        <Surface style={styles.surface}>
          <Headline>RO Water Purifiers</Headline>
          <Image
            source={{
              uri: "https://www.kent.co.in/images/ro/water-purifiers.png",
            }}
            style={styles.bannerImgStyle}
          />
          <Text>
            Trusted by Millions, India’s Chipest and most awarded RO Water
            Purifiers make your water 100% pure. With its revolutionary Mineral
            ROTM technology and multiple purification process of RO+UV+UF,
            Pragya RO System ensures 100% pure & healthier drinking water.
          </Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("Products")}
          >
            View More
          </Button>
        </Surface>
        <Surface style={styles.surface}>
          <Headline>UV Water Purifiers</Headline>
          <Image
            source={{
              uri: "https://www.kent.co.in/images/water-purifiers/uv/uv-water-purifiers-main-banner.png",
            }}
            style={styles.bannerImgStyle}
          />
          <Text>
            Pragya RO System offers innovative UV Water Purifiers that are easy
            to use and disinfect water without altering its taste and odour.
            These purifiers are equipped with UV followed by UF membrane to
            disinfect water, making it free from deadly bacteria, viruses and
            cysts.
          </Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("Products")}
          >
            View More
          </Button>
        </Surface>
        <Surface style={styles.surface}>
          <Headline>Gravity Water Purifiers</Headline>
          <Image
            source={{
              uri: "https://www.kent.co.in/images/water-purifiers/gravity-uf/gravity-uf-banner-mobile.png",
            }}
            style={styles.bannerImgStyle}
          />
          <Text>
            Pragya RO System has brought up its high end non electric Gravity
            Water Purifiers that use natural force of gravity to eliminate
            suspended impurities, bacteria and cyst to make your drinking water
            pure. This eradicates the rising problem of contaminated water in
            rural areas.
          </Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("Products")}
          >
            View More
          </Button>
        </Surface>
        <Surface style={styles.surface}>
          <Headline>Customer Service</Headline>
          <Image
            source={{
              uri: "https://www.kent.co.in/images/home-img/kent-employee.png",
            }}
            style={styles.bannerImgStyle}
          />
          <Text>
            Service is an essential part of a Water Purifier as you may require
            to change the filters. Getting Genuine Service from Pragya RO System
            is important as only from Pragya RO System you can get Genuine
            Spares which will continue to ensure that you get 100% Pure Water.
            Call only 89203 10622 from anywhere in Ara. Please do not call any
            other number or dealers directly. Service Request can also be made
            here.
          </Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("ServiceNow")}
          >
            Request Service
          </Button>
        </Surface>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  homeMainContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  homeContainer: {
    width: "100%",
  },
  bannerStyle: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bannerImgStyle: {
    aspectRatio: 2.8,
    width: "80%",
    height: undefined,
  },
  bannerButton: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  surface: {
    padding: 30,
    marginTop: 50,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 8,
  },
});
