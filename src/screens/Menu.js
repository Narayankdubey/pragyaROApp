import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";

import { IconButton } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import React from "react";
import Home from "./Home";
import Products from "./Products";
import ContactUs from "./ContactUs";
import ServiceNow from "./ServiceNow";

function CustomDrawerContent(props) {
  return (
    <SafeAreaView
      style={{ flex: 1 }}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View>
        {/* <DrawerItem
          label={"Logout"}
          style={styles.logoutDrawerItem}
          onPress={() => console.log("Logout pressed!")}
        /> */}
        <Text style={styles.version}>V 1.0</Text>
      </View>
    </SafeAreaView>
  );
}

const Menu = ({ navigation }) => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          // backgroundColor: "white",
          // width: 240,
        },
        // drawerPosition: "right",
        // drawerType: "back",
        overlayColor: "transparent",
        headerRight: (props) => (
          <IconButton
            icon={({ focused, size }) => (
              <FontAwesome5
                name="search"
                size={size}
                color={focused ? "#7cc" : "black"}
              />
            )}
            onPress={() => navigation.navigate("Search")}
          />
        ),
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {/* <DrawerItem label="Profile" onPress={() => navigation.closeDrawer()} /> */}
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="md-home"
              size={size}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Products"
        component={Products}
        options={{
          drawerIcon: ({ focused, size }) => (
            <AntDesign
              name="shoppingcart"
              size={size}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons
              name="contact-mail"
              size={size}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="ServiceNow"
        component={ServiceNow}
        options={{
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons
              name="miscellaneous-services"
              size={size}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default Menu;

const styles = StyleSheet.create({
  version: {
    textAlign: "center",
    marginBottom: 15,
  },
});
