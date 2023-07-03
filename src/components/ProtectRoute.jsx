import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Topbar from './Topbar';

const ProtectRoute = () => {
  const loggedInUserId = localStorage.getItem('isLoggedIn');
  const location = useLocation();
 
   return (
    <>
      <Topbar />
      {loggedInUserId ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace/>}
    </>  
  )
}

export default ProtectRoute;
