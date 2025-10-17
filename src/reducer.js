import { createStore } from "redux";

const initialState = {
  isLoading: false,
  isLogin: false,
  isOverlay: false,
  isOverflow: true,
  selectedNavAction: "",
  dimension: {},
  isLoginPopupOpened: false,
  snakeBarContent: "",
  secondDrawerOpen: null,
  services: [],
  userProfile: {},
  userAddresses: [],
  topProfessionals: [],
  adminDetails: {},
  dashboardFilters: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_IS_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "SET_IS_LOGIN":
      return {
        ...state,
        isLogin: action.payload,
      };

    case "SET_IS_OVERLAY":
      return {
        ...state,
        isOverlay: action.payload,
      };

    case "SET_IS_OVERFLOW":
      return {
        ...state,
        isOverflow: action.payload,
      };

    case "SET_SELECTED_NAV_ACTION":
      return {
        ...state,
        selectedNavAction: action.payload,
      };

    case "SET_DIMENSION":
      return {
        ...state,
        dimension: action.payload,
      };

    case "SET_IS_LOGIN_POPUP_OPENED":
      return {
        ...state,
        isLoginPopupOpened: action.payload,
      };

    case "SET_SNAKE_BAR_CONTENT":
      return {
        ...state,
        snakeBarContent: action.payload,
      };

    case "SET_SECOND_DRAWER_OPEN":
      return {
        ...state,
        secondDrawerOpen: action.payload,
      };

    case "SET_SERVICES":
      return {
        ...state,
        services: action.payload,
      };

    case "SET_USER_PROFILE":
      return {
        ...state,
        userProfile: action.payload,
      };

    case "SET_USER_ADDRESSES":
      return {
        ...state,
        userAddresses: action.payload,
      };

    case "SET_TOP_PROFESSIONALS":
      return {
        ...state,
        topProfessionals: action.payload,
      };

    case "SET_ADMIN_DETAILS":
      return {
        ...state,
        adminDetails: action.payload,
      };

    case "SET_DASHBOARD_FILTERS":
      return {
        ...state,
        dashboardFilters: action.payload,
      };

    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
