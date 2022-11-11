import { useMemo } from "react";
import { AppContextState } from "./hooks";

// Context provider
const AppContextProvider = ({ children }) => {
  const contextStateValue = useMemo(() => {
    // contextState values
  }, []);

  return (
    <AppContextState.Provider value={contextStateValue}>
      {children}
    </AppContextState.Provider>
  );
};

export default AppContextProvider;
