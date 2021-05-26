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
  userProfile: [],
  allCountries: [],
  allProvinces: [],
  allDistricts: [],
  countryId: "",
  provinceId: "",
  districtId: "",
  shopList: [],
  shopId: "",
  shopDetails: [],
  shopProduct: [],
  shopInvoice: [],
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

        user: jwt(action.payload.token),
        token: action.payload.token,
        loading: false,
      };

    case "LOGOUT":
      return {
        ...initialState,
        user: "",
        token: "",
        userProfile: [],
        allCountries: [],
        allProvinces: [],
        allRegencies: [],
        countryId: "",
        provinceId: "",
        regencyId: "",
        shopList: [],
        shopId: "",
        shopDetails: [],
        shopProduct: [],
        shopInvoice: [],
        loading: false,
        errorMessage: null,
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

    case "GET_SHOP_ID":
      return {
        ...initialState,
        shopId: action.payload,
      };

    case "GET_SHOP_DETAIL":
      return {
        ...initialState,
        shopDetails: action.payload,
      };

    case "GET_SHOP_PRODUCT":
      return {
        ...initialState,
        shopProduct: action.payload,
      };

    case "GET_SHOP_INVOICE":
      return {
        ...initialState,
        shopInvoice: action.payload,
      };

    case "GET_ALL_COUNTRIES":
      return {
        ...initialState,
        allCountries: action.payload,
      };

    case "GET_COUNTRY_ID":
      return {
        ...initialState,
        countryId: action.payload,
      };

    case "GET_ALL_PROVINCES":
      return {
        ...initialState,
        allProvinces: action.payload,
      };

    case "GET_PROVINCE_ID":
      return {
        ...initialState,
        provinceId: action.payload,
      };

    case "GET_ALL_REGENCIES":
      return {
        ...initialState,
        allRegencies: action.payload,
      };

    case "GET_REGENCY_ID":
      return {
        ...initialState,
        regencyId: action.payload,
      };

    case "GET_USER_PROFILE":
      return {
        ...initialState,
        userProfile: action.payload,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
