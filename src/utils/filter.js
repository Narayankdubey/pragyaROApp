import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Button,
  Title,
  Dialog,
  RadioButton,
  //   Divider
} from "react-native-paper";

import {
  //   Dialog,
  Tab,
  TabView,
  CheckBox,
  ListItem,
  Avatar,
  Divider,
} from "@rneui/themed";

import {
  getAllProducts,
  getFilterElements,
  getFilterQueryData,
  clearProduct,
} from "../store/product-action";

import NoDataFound from "../ui/NoDataFound";

const FilterDialog = ({ navigation, route }) => {
  const { searchInput, sortData } = route.params;

  const dispatch = useDispatch();
  const { filterElements, products, filterQueryData } = useSelector(
    (state) => state.product
  );
  const [index, setIndex] = useState(0);
  const [filterData, setFilterData] = useState({});

  const tabs = [
    // { name: "Brands", value: "brands", filterName: "uniqueBrands" },
    {
      name: "Colour",
      value: "color",
      filterName: "uniqueColors",
      icon: "color-palette-outline",
    },
    {
      name: "Capacity",
      value: "capacity",
      filterName: "capcityRange",
      icon: "beaker-outline",
    },
    {
      name: "Technology",
      value: "purifying_technology",
      filterName: "uniquePurifyingTech",
      icon: "build-outline",
    },
    {
      name: "Booster",
      value: "booster_pump",
      filterName: "uniqueBoosterPump",
      icon: "settings-outline",
    },
    {
      name: "Voltage",
      value: "voltage",
      filterName: "voltageRange",
      icon: "flash-outline",
    },
    {
      name: "Price",
      value: "price",
      filterName: "priceRange",
      icon: "card-outline",
    },
  ];

  useEffect(() => {
    dispatch(getFilterElements(filterData));
  }, []);

  const onChangeTab = (e) => {
    dispatch(clearProduct());
    dispatch(getFilterElements(filterData));
    dispatch(getAllProducts(filterData, 1, 5, searchInput, sortData));
    setIndex(e);
    // dispatch(getFilterElements(filterData));
    // dispatch(getAllProducts(filterData, 1, 5, searchInput,));
  };
  const onCheckHandle = (data) => {
    const dataKey = Object.keys(data);
    if (dataKey.length > 0) {
      if (filterData.hasOwnProperty(dataKey[0])) {
        if (typeof filterData[dataKey[0]][0] === "object") {
          let found = false;
          for (let i = 0; i < filterData[dataKey[0]].length; i++) {
            if (
              filterData[dataKey[0]][i].min === data[dataKey[0]].min &&
              filterData[dataKey[0]][i].max === data[dataKey[0]].max
            ) {
              found = true;
              const tempData = filterData;
              tempData[dataKey[0]].splice(i, 1);
              setFilterData({ ...tempData });
            }
          }
          if (!found) {
            const checkData = filterData;
            checkData[dataKey[0]].push(data[dataKey[0]]);
            setFilterData({ ...checkData });
          }
        } else {
          if (filterData[dataKey[0]].includes(data[dataKey[0]])) {
            const tempData = filterData;
            const index = tempData[dataKey[0]].indexOf(data[dataKey[0]]);
            if (index > -1) {
              tempData[dataKey[0]].splice(index, 1);
            }
            setFilterData({ ...tempData });
          } else {
            const checkData = filterData;
            checkData[dataKey[0]].push(data[dataKey[0]]);
            setFilterData({ ...checkData });
          }
        }
      } else {
        setFilterData({ ...filterData, [dataKey[0]]: [data[dataKey[0]]] });
      }
    }
  };
  const checkChecked = (key, item) => {
    if (filterData.hasOwnProperty(key)) {
      for (let i = 0; i < filterData[key].length; i++) {
        if (
          filterData[key][i].hasOwnProperty("min") &&
          filterData[key][i].hasOwnProperty("max") &&
          filterData[key][i].min === item.min &&
          filterData[key][i].max === item.max
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const onSubmit = () => {
    dispatch(clearProduct());
    // dispatch(getFilterElements(filterData));
    dispatch(getAllProducts(filterData, 1, 5, searchInput, sortData));
    navigation.navigate("Products", filterData);
  };

  const clearHandler = () => {
    setFilterData({});
    dispatch(clearProduct());
    dispatch(getFilterElements({}));
    dispatch(getAllProducts({}, 1, 5, searchInput, sortData));
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.tabContainerStyle}>
        <Tab
          value={index}
          onChange={(e) => onChangeTab(e)}
          disableIndicator={true}
          // scrollable={true}
          variant="primary"
          containerStyle={{
            flexDirection: "column",
            justifyContent: "flex-start",
            // backgroundColor: "red",
          }}
        >
          {tabs.map((item, index) => {
            return (
              <Tab.Item
                key={index}
                title={item.name}
                titleStyle={{ fontSize: 12 }}
                buttonStyle={({ active }) => {
                  active
                    ? { backgroundColor: "blue" }
                    : { backgroundColor: "pink" };
                }}
                icon={{
                  name: item.icon,
                  type: "ionicon",
                  color: "white",
                }}
                containerStyle={(active) => {
                  backgroundColor: active ? "pink" : "red";
                }}
              />
            );
          })}
        </Tab>

        <TabView
          value={index}
          onChange={setIndex}
          animationType="spring"
          containerStyle={{ flexDirection: "column", overflow: "hidden" }}
        >

          {tabs.map((element, index) => {
            return (
              <TabView.Item style={{ width: "100%" }} key={index}>
                <ScrollView>
                  {filterElements.hasOwnProperty(element.filterName) &&
                  typeof filterElements[element.filterName][0] !== "object"
                    ? filterElements[element.filterName].map((item, index) => {
                        return (
                          <CheckBox
                            key={index}
                            title={item}
                            checked={
                              filterData.hasOwnProperty(element.value) &&
                              filterData[element.value].includes(item)
                            }
                            onPress={() =>
                              onCheckHandle({ [element.value]: item })
                            }
                            containerStyle={{
                              backgroundColor: `rgb(255,150,${index * 50})`,
                              color: "white",
                            }}
                          />
                        );
                      })
                    : filterElements.hasOwnProperty(element.filterName) &&
                      filterElements[element.filterName].map((item, index) => {
                        return (
                          <CheckBox
                            key={index}
                            title={`${item.min} L -- ${item.max} L`}
                            checked={checkChecked([element.value], item)}
                            onPress={() =>
                              onCheckHandle({
                                [element.value]: {
                                  ["min"]: item.min,
                                  ["max"]: item.max,
                                },
                              })
                            }
                            containerStyle={{
                              backgroundColor: `rgb(255,150,${index * 50})`,
                            }}
                          />
                        );
                      })}
                </ScrollView>
              </TabView.Item>
            );
          })}
        </TabView>
        {/* <Divider style={{ width: "100%" }} /> */}
      </View>
      <View style={styles.bottomContainer}>
        <View>
          <Title>Filter Product</Title>
          <Text>
            {products.hasOwnProperty("totalCount")
              ? products.totalCount
              : "loading..."}
          </Text>
        </View>

        <View style={styles.submitBtnContainer}>
          <Button onPress={clearHandler}>Clear</Button>
          <Button mode="contained" onPress={onSubmit}>
            Filter
          </Button>
        </View>
      </View>
    </View>
  );
};

export default FilterDialog;

const styles = StyleSheet.create({
  filterDialog: {
    // width: "100%",
    // height: "100%",
    // position: "absolute",
    // top: 0,
    // left: 0,
    // zIndex: 5,
  },
  tabContainerStyle: {
    flex: 0.9,
    flexDirection: "row",
  },
  tabStyle: {
    height: "100%",
    flexDirection: "column",
  },
  tabDisplayStyle: {
    width: "60%",
    height: "100%",
    flexDirection: "column",
    overflow: "hidden",
  },
  bottomContainer: {
    flex: 0.1,
    width: "100%",
    // padding: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  submitBtnContainer: {
    width: "50%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});
