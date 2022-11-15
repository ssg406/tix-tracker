import { useContext, createContext } from "react";

// State and Updater contexts
const AppContextState = createContext();

// State context consumer hook
const useAppContext = () => {
  const context = useContext(AppContextState);

  if (context === undefined) {
    throw new Error("useAppContextState accessed outside of provider");
  }

  return context;
};

export { AppContextState, useAppContext };