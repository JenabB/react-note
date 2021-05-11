import jwt from "jwt-decode";

let user = localStorage.getItem("token")
  ? jwt(localStorage.getItem("token"))
  : "";
let token = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : "";

export const initialState = {
  user: "" || user,
  token: "" || token,
  shopList: [],
  shopId: "",
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_REGISTER":
      return {
        ...initialState,
        loading: true,
      };

    case "REGISTER_SUCCESS":
      return {
        ...initialState,
        message: action.payload.data,
      };

    case "REGISTER_ERROR":
      return {
        ...initialState,
        errorMessage: action.error,
      };

    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        user: action.payload.token,
        token: action.payload.token,
        loading: false,
      };

    case "LOGOUT":
      return {
        ...initialState,
        user: "",
        token: "",
      };

    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };

    case "GET_SHOP_LIST":
      return {
        ...initialState,
        loading: false,
      };

    case "GET_SHOP_LIST_SUCCESS":
      return {
        ...initialState,
        shopList: action.payload,
      };

    case "GET_SHOP_LIST_ERROR":
      return {
        ...initialState,
        errorMessage: action.error,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
