import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Dialog, RadioButton, Divider } from "react-native-paper";

const SortDialog = ({
  setSortData,
  open,
  setOpen,
  sortData,
  handleClickOpen,
  handleSortDataChange,
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  const sortItems = [
    {
      label: "by price -- low- high",
      value: "priceAsc",
      order: 1,
      sortField: "price",
    },
    {
      label: "by price -- high - low",
      value: "priceDesc",
      order: -1,
      sortField: "price",
    },
    {
      label: "By Name",
      value: "product_nameAsc",
      order: 1,
      sortField: "product_name",
    },
  ];
  return (
    <Dialog visible={open} onDismiss={handleClose}>
      <Dialog.Title>Sort</Dialog.Title>
      <Divider />
      <Dialog.Content>
        {sortItems.map((items, index) => (
          <View key={index}>
            {/* <Text >{items.label}</Text> */}
            <RadioButton.Item
              label={items.label}
              value={items.value}
              status={sortData.value === items.value ? "checked" : "unchecked"}
              onPress={() => {
                handleSortDataChange(items);
              }}
            />
          </View>
        ))}
      </Dialog.Content>
    </Dialog>
  );
};

export default SortDialog;

const styles = StyleSheet.create({
  sortElement: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
