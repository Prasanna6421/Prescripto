import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  
  if (!user) {
    alert('Please login first to access this page');
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default ProtectedRoute;