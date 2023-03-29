import { Navigate } from 'react-router-dom';
import { useAPI } from '../../hooks/useAPI';

function ProtectedRoute({children}) {
  const { isLoggedIn } = useAPI();
  
  if (!isLoggedIn) return <Navigate to='/login' />;
  return children;
}

export default ProtectedRoute;
