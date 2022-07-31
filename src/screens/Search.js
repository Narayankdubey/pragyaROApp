import { StyleSheet, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { Searchbar } from "react-native-paper";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  return (
    <ScrollView
      style={styles.searchContainer}
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: "center",
      }}
    >
      <Searchbar
        placeholder="Search"
        onChangeText={(query) => setSearchInput(query)}
        value={searchInput}
        style={styles.searchStyle}
      />
    </ScrollView>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchContainer: {},
  searchStyle: {
    width: "90%",
    marginTop: 5,
  },
});
