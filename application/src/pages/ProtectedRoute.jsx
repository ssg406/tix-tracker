import { useAppContext } from '../context';
import Register from './Register';

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();

  if (user) {
    return children;
  } else {
    return <Register />;
  }
};

export default ProtectedRoute;
