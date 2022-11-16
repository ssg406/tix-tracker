import {
  START_SETUP_USER,
  SUCCESS_SETUP_USER,
  ERROR_SETUP_USER,
  HIDE_ALERT,
  LOGOUT_USER,
  TOGGLE_MOBILE_NAV,
  START_UPDATE_USER,
  SUCCESS_UPDATE_USER,
  ERROR_UPDATE_USER,
  START_CREATE_TICKET,
  SUCCESS_CREATE_TICKET,
  ERROR_CREATE_TICKET,
  START_GET_TICKETS,
  SUCCESS_GET_TICKETS,
  ERROR_GET_TICKETS,
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
        alerType: "danger",
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
    case START_UPDATE_USER:
      return {
        ...state,
        isLoading: true,
      };
    case SUCCESS_UPDATE_USER:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "User updated successfully",
        user: action.payload.user,
        token: action.payload.token,
      };
    case ERROR_UPDATE_USER:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.message,
      };
    case START_CREATE_TICKET:
      return {
        ...state,
        isLoading: true,
      };
    case SUCCESS_CREATE_TICKET:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "Ticket created successfully!",
      };
    case ERROR_CREATE_TICKET:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.message,
      };
    case START_GET_TICKETS:
      return {
        ...state,
        isLoading: true,
      };
    case SUCCESS_GET_TICKETS:
      return {
        ...state,
        isLoading: false,
        tickets: action.payload.tickets,
      };
    case ERROR_GET_TICKETS:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.message,
      };
    default:
      throw new Error("Invalid argument to reducer");
  }
};

export default reducer;
