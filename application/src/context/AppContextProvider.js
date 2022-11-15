import { useMemo, useReducer } from "react";
import { AppContextState } from "./hooks";
import reducer from "./reducer";
import axios from "axios";
import {
  START_SETUP_USER,
  SUCCESS_SETUP_USER,
  ERROR_SETUP_USER,
  SHOW_ALERT,
  HIDE_ALERT,
  LOGOUT_USER,
  TOGGLE_MOBILE_NAV,
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
      console.info(user);
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

  const updateUser = (userDetails) => {};

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

  const contextStateValue = useMemo(() => {
    // contextState values
  }, []);

  return (
    <AppContextState.Provider
      value={{
        ...state,
        registerUser,
        toggleMobileNav,
        logoutUser,
        updateUser,
      }}
    >
      {children}
    </AppContextState.Provider>
  );
};

export default AppContextProvider;
