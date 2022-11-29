import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context';
import Register from './Register';

const ProtectedRoute = ({ children }) => {
  const { user, token } = useAppContext();

  if (!user) {
    return <Navigate to='/landing' />;
  }
  return children;
};

export default ProtectedRoute;
