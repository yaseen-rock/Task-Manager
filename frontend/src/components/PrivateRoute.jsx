import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../api/auth';

export default function PrivateRoute({ children }) {
  const user = getCurrentUser();
  return user ? children : <Navigate to="/login" />;
}