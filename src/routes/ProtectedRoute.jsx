import React from 'react';
import { Navigate, useLocation } from 'react-router-dom'; 
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  if (!Cookies.get('token') && !Cookies.get('user')) {
    // Redirect to login with the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute; 