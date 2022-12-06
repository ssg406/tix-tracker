import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';

const ProtectedRoute = ({ children }) => {
  // const { user, token } = useAppContext();
  const user = useAppSelector((state) => state.user.user);

  if (!user) {
    return <Navigate to='/landing' />;
  }
  return children;
};

export default ProtectedRoute;
