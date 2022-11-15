import {
  START_SETUP_USER,
  SUCCESS_SETUP_USER,
  ERROR_SETUP_USER,
  HIDE_ALERT,
  LOGOUT_USER,
  TOGGLE_MOBILE_NAV,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case START_SETUP_USER:
      return {
        ...state,
        isLoading: true,
      };
    case SUCCESS_SETUP_USER:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertText: action.payload.alertText,
        user: action.payload.user,
        token: action.payload.token,
      };
    case ERROR_SETUP_USER:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertText: action.payload.message,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        token: null,
      };
    case HIDE_ALERT:
      return {
        ...state,
        showAlert: false,
      };
    case TOGGLE_MOBILE_NAV:
      return {
        ...state,
        showMobileNav: !state.showMobileNav,
      };
    default:
      throw new Error("Invalid argument to reducer");
  }
};

export default reducer;
