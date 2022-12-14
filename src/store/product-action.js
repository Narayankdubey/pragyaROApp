import axios from "axios";
import { productActions } from "./product-slice";
import { uiActions } from "./ui-slice";
// const baseURL = process.env.REACT_APP_API_BASE_URL;
const baseURL = "https://pragyarosystem.herokuapp.com/api/";
// const baseURL = "http://localhost:4000/api/";

export const getAllProducts = (
  filterQuery = {},
  pageNo = 1,
  limit = 5,
  searchData = "",
  sortData = {}
) => {
  return async (dispatch, getState) => {
    const encodeData = encodeURI(JSON.stringify(filterQuery));
    dispatch(uiActions.toggleSkeleton(true));
    const getData = async () => {
      const response = await axios.get(
        `${baseURL}products?search=${searchData}&filterQuery=${encodeData}&sort=${sortData.sortField}&sortOrder=${sortData.sortOrder}&page=${pageNo}&limit=${limit}`,
        filterQuery,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    try {
      const data = await getData();
      const currentProducts = getState().product.products;
      if (currentProducts.hasOwnProperty("results")) {
        data.data.results = [...currentProducts.results, ...data.data.results];
        data.data.results = data.data.results.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t._id === value._id)
        );
        dispatch(productActions.updateProductsList(data.data));
      } else {
        dispatch(productActions.updateProductsList(data.data));
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        // Request made and server responded
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "error",
            message: error.response.data,
          })
        );
      }
    } finally {
      dispatch(uiActions.toggleSkeleton(false));
    }
  };
};

export const saveContactUs = (data) => {
  return async (dispatch) => {
    dispatch(uiActions.toggleLoader());
    const sendData = async () => {
      const response = await axios.post(`${baseURL}api-contactus`, data);
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    try {
      await sendData();
      dispatch(productActions.updateInfoModalStatus(true));
    } catch (error) {
      console.log(error);
      if (error.response) {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "error",
            message: error.response.data,
          })
        );
      }
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};

export const getProduct = (id) => {
  return async (dispatch) => {
    dispatch(uiActions.toggleLoader());
    const getData = async () => {
      const response = await axios.get(`${baseURL}products/${id}`);
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    try {
      const data = await getData();
      dispatch(productActions.updateProduct(data.data));
    } catch (error) {
      console.log(error);
      if (error.response) {
        // Request made and server responded
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "error",
            message: error.response.data,
          })
        );
      }
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};
export const clearProduct = () => {
  return async (dispatch) => {
    dispatch(uiActions.toggleLoader());
    try {
      const data = [];
      dispatch(productActions.updateProductsList(data));
    } catch (error) {
      console.log(error);
      if (error.response) {
        // Request made and server responded
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "error",
            message: error.response.data,
          })
        );
      }
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};
export const getFilterQueryData = (data) => {
  return async (dispatch) => {
    dispatch(uiActions.toggleLoader());
    try {
      const data = [];
      dispatch(productActions.updatefilterQueryData(data));
    } catch (error) {
      console.log(error);
      if (error.response) {
        // Request made and server responded
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "error",
            message: error.response.data,
          })
        );
      }
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};

export const getFilterElements = (data = {}) => {
  return async (dispatch) => {
    dispatch(uiActions.filterElementLoader(true));
    const getData = async () => {
      const encodeData = encodeURI(JSON.stringify(data));
      const response = await axios.get(
        `${baseURL}filterElemets?filterQuery=${encodeData}`
      );
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };
    try {
      const data = await getData();
      dispatch(productActions.updatefilterElements(data.data));
    } catch (error) {
      console.log(error);
      if (error.response) {
        // Request made and server responded
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "error",
            message: error.response.data,
          })
        );
      }
    } finally {
      dispatch(uiActions.filterElementLoader(false));
    }
  };
};
