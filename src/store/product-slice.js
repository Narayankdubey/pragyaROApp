import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {},
  products: [],
  infoModal: false,
  filterElements: {},
  filterQueryData: {},
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProductsList: (state, action) => {
      state.products = action.payload;
    },
    updateInfoModalStatus: (state, action) => {
      state.infoModal = action.payload;
    },
    updateProduct: (state, action) => {
      state.product = action.payload;
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (e) => e._id !== action.payload._id
      );
    },
    updatefilterElements: (state, action) => {
      state.filterElements = action.payload;
    },
    updatefilterQueryData: (state, action) => {
      state.filterQueryData = action.payload;
    },
  },
});
export const productActions = productSlice.actions;
export default productSlice;
