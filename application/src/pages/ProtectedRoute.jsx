import { useAppContext } from "../context";
import { useNavigate } from "react-router-dom";
import Register from "./Register";

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();
  const navigate = useNavigate();

  if (user) {
    return children;
  } else {
    return <Register />;
  }
};

export default ProtectedRoute;
