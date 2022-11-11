import { Register } from "./pages";
import { AppContextProvider } from "./context";

const App = () => {
  return (
    <AppContextProvider>
      <Register />
    </AppContextProvider>
  );
};

export default App;
