import { useMemo, useReducer } from "react";
import { AppContextState } from "./hooks";
import reducer from "./reducer";
import axios from "axios";
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
} from "./actions";

// Check local storage for saved user and token
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

// Initial application state values
const initialSate = {
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token ? token : null,
  isLoading: false,
  showMobileNav: false,
};

// Context provider
const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialSate);

  // Create Axios instance and set base URL
  const axiosInstance = axios.create({
    baseURL: "/api/v1",
  });

  // Configure auth headers
  if (state.token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
  }

  // axiosInstance.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     console.log(error.response.data);
  //     return Promise.reject(error);
  //   }
  // );

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: HIDE_ALERT });
    }, 3000);
  };

  const registerUser = async ({ formState, endpoint, alertText }) => {
    dispatch({ type: START_SETUP_USER });
    try {
      const { data } = await axiosInstance.post(`auth/${endpoint}`, formState);
      const { user, token } = data;
      addUserToLocalStorage({ user, token });
      dispatch({
        type: SUCCESS_SETUP_USER,
        payload: { user, token, alertText },
      });
    } catch (error) {
      dispatch({
        type: ERROR_SETUP_USER,
        payload: { message: error.response.data.message },
      });
    }
    clearAlert();
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const updateUser = async (userDetails) => {
    dispatch({ type: START_UPDATE_USER });
    console.log(userDetails);
    try {
      const { data } = await axiosInstance.patch("auth/updateUser", {
        userId: state.user.userId,
        email: userDetails.email,
        name: userDetails.name,
      });
      const { user } = data;
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: SUCCESS_UPDATE_USER, payload: user });
    } catch (error) {
      dispatch({
        type: ERROR_UPDATE_USER,
        payload: { message: error.response.data.message },
      });
    }
    clearAlert();
  };

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const toggleMobileNav = () => {
    dispatch({ type: TOGGLE_MOBILE_NAV });
  };

  const createTicket = ({ date, description }) => {
    dispatch({ type: START_CREATE_TICKET });
    const createdBy = state.user.userId;
    try {
      axiosInstance.post("tickets/new", {
        date: date,
        createdBy: createdBy,
        description: description,
      });
      dispatch({ type: SUCCESS_CREATE_TICKET });
    } catch (error) {
      console.log(`THE ERROR WAS ${error.response.data}`);
      dispatch({
        type: ERROR_CREATE_TICKET,
        payload: { message: error.response.data.message },
      });
    }
    clearAlert();
  };

  return (
    <AppContextState.Provider
      value={{
        ...state,
        registerUser,
        toggleMobileNav,
        logoutUser,
        updateUser,
        createTicket,
      }}
    >
      {children}
    </AppContextState.Provider>
  );
};

export default AppContextProvider;
