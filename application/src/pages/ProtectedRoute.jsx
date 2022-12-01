import { redirect } from 'react-router-dom';
import { useAppContext } from '../context';
import Register from './Register';

const ProtectedRoute = ({ children }) => {
  const { user, token } = useAppContext();

  if (!user) {
    return redirect('/landing');
  }
  return children;
};

export default ProtectedRoute;
