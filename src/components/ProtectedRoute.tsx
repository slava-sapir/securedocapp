import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Key } from '../enum/cashe.key';

const ProtectedRoute = () => {
  const location = useLocation();
  const isLoggedIn: boolean = JSON.parse(localStorage.getItem(Key.LOGGEDIN)!) as boolean || false;

  if(isLoggedIn) {
    return <Outlet />
  } else {
    // Toast notification
    return <Navigate to={'/login'} replace state={{ from: location }} />;
  }
}

export default ProtectedRoute