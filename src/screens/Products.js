import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import {
  Title,
  Headline,
  Paragraph,
  Button,
  TouchableRipple,
  Surface,
  Searchbar,
  FAB,
  Dialog,
  Badge,
} from "react-native-paper";

import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import ProductSkeleton from "../ui/ProductSkeleton";
import SortDialog from "../utils/sort";
// import FilterDialog from "../utils/filter";
import { getAllProducts, clearProduct } from "../store/product-action";

const Products = ({ filterData, navigation }) => {
  const dispatch = useDispatch();
  const { products, filterQueryData } = useSelector((state) => state.product);
  const [buyNowModalOpen, setBuyNowModalOpen] = useState(false);
  const [page, setPage] = React.useState(1);
  const [openSortDialog, setOpenSortDialog] = useState(false);
  // const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [sortData, setSortData] = useState({
    sortField: "",
    sortOrder: 1,
    value: "",
  });
  const [loadData, setLoadData] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  let rawData;

  useEffect(() => {
    dispatch(getAllProducts(filterQueryData, 1, 5, searchInput, sortData));
    setPage(1);
    setRefresh(false);
    setLoadData(false);
    return () => dispatch(clearProduct());
  }, [sortData]);

  useEffect(() => {
    if (refresh) {
      dispatch(getAllProducts(filterQueryData, 1, 5, searchInput, sortData));
      setPage(1);
      setRefresh(false);
      setLoadData(false);
    }
    return () => dispatch(clearProduct());
  }, [refresh]);

  useEffect(() => {
    if (loadData && page < products.pageCount && products.results.length > 0) {
      setPage(page + 1);
      dispatch(
        getAllProducts(filterQueryData, page + 1, 5, searchInput, sortData)
      );
      setLoadData(false);
    }
  }, [loadData]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchInput) {
        dispatch(getAllProducts(filterQueryData, 1, 5, searchInput, sortData));
        setPage(1);
      }
    }, 1000);

    return () => {
      clearTimeout(delayDebounceFn);
      dispatch(clearProduct());
    };
  }, [searchInput]);

  rawData = products.results;

  const data = rawData;

  const buyNowHandler = () => {
    setBuyNowModalOpen(true);
  };

  const handleClickSortDialogOpen = () => {
    setOpenSortDialog(true);
  };
  const handleClickFilterDialogOpen = () => {
    setOpenFilterDialog(true);
  };

  const handleSortDataChange = (items) => {
    setSortData({
      sortField: items.sortField,
      sortOrder: items.order,
      value: items.value,
    });
    setOpenSortDialog(false);
    setPage(1);
  };

  const okHandle = () => {
    setBuyNowModalOpen(false);
  };

  const renderItem = ({ item }) => (
    <Surface style={styles.productContainer}>
      <View style={styles.imgContainer}>
        <Image style={styles.imgStyle} source={{ uri: item.img }} />
      </View>
      <Headline>{item.product_name}</Headline>
      <Paragraph>({item.purifying_technology})</Paragraph>
      <Paragraph>{item.capacity}L Capacity</Paragraph>
      <Paragraph>{item.voltage}VDC Volt</Paragraph>
      <Paragraph>{item.booster_pump} Booster Pump</Paragraph>
      <Title>MRP ₹{item.price}/-</Title>
      <TouchableRipple rippleColor="rgba(0, 0, 0, .32)">
        <Button mode="contained" onPress={buyNowHandler}>
          Buy Now
        </Button>
      </TouchableRipple>
    </Surface>
  );

  return (
    <View style={[styles.productSubContainer, { flex: 1 }]}>
      <Searchbar
        placeholder="Search"
        onChangeText={(query) => setSearchInput(query)}
        value={searchInput}
        style={styles.searchStyle}
      />
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        refreshing={refresh}
        onRefresh={() => setRefresh(true)}
        keyExtractor={(item) => item._id}
        ListFooterComponent={() => {
          return <ProductSkeleton />;
        }}
        onEndReached={() => {
          setLoadData(true);
        }}
        onEndThreshold={0}
      />
      <View style={styles.fabContainer}>
        <FAB
          icon={() => <MaterialIcons name="sort" size={24} color="white" />}
          onPress={() => handleClickSortDialogOpen()}
        />
        {Object.keys(filterQueryData).length > 0 && (
          <Badge style={styles.badgeStyle}>
            {Object.keys(filterQueryData).length}
          </Badge>
        )}
        <FAB
          icon={() => <FontAwesome5 name="filter" size={24} color="white" />}
          onPress={() =>
            navigation.navigate("Filter", {
              searchInput: searchInput,
              sortData: sortData,
            })
          }
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={buyNowModalOpen}
        onRequestClose={() => {
          setBuyNowModal(!buyNowModalOpen);
        }}
        style={styles.modalStyle}
      >
        <View style={styles.modalElements}>
          <Headline>Thank you for your interest</Headline>
          <Title>For More Details </Title>
          <Paragraph>please call on 8920310622</Paragraph>
          <Button mode="contained" onPress={okHandle}>
            Ok
          </Button>
        </View>
      </Modal>
      <SortDialog
        setSortData={setSortData}
        open={openSortDialog}
        setOpen={setOpenSortDialog}
        handleClickOpen={handleClickSortDialogOpen}
        handleSortDataChange={handleSortDataChange}
        sortData={sortData}
      />
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  productMainContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  productSubContainer: {
    width: "100%",
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  productContainer: {
    width: "100%",
    padding: 30,
    // marginHorizontal: "auto",
    marginVertical: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 5,
    elevation: 4,
  },
  imgContainer: {
    padding: 10,
  },
  imgStyle: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
  modalStyle: {
    // backgroundColor: "red",
  },
  modalElements: {
    width: "100%",
    marginHorizontal: "auto",
    marginVertical: 200,
    backgroundColor: "pink",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  loaderViewStyle: {
    // height: "100%",
  },
  searchStyle: {
    margin: 5,
    width: "90%",
  },
  fabContainer: {
    // width: "70px",
    height: 140,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 15,
    right: 15,
    // zIndex: 12,
  },
  fab: {
    // position: "absolute",
    // margin: 16,
    // right: 0,
    // bottom: 0,
  },
  badgeStyle: {
    position: "relative",
    top: 10,
  },
  filterDialog: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },
});
