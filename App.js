// import {  } from "expo-status-bar";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { Title } from "react-native-paper";

import store from "./src/store";
import StackNavigation from "./src/screens/StackNavigation";
import FullScreenLoader from "./src/ui/FullScreenLoader";

const App = () => {
  return (
    <Provider store={store}>
      <Title style={styles.titleContainer}>Pragya RO System</Title>
      <StackNavigation />
      <FullScreenLoader />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    // padding: 0,
    // flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },

  titleContainer: {
    // padding: 1,
    paddingTop: StatusBar.currentHeight,
    textAlign: "center",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#1976d2",
  },
});

export default App;
