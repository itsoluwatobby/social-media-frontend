import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Topbar from './Topbar';

const ProtectRoute = () => {
  const LoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))
  const location = useLocation()
 
   return (
    <>
      <Topbar />
      {LoggedIn ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace/>}
    </>  
  )
}

export default ProtectRoute;
