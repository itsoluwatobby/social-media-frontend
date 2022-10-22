import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Topbar from './Topbar';

const ProtectRoute = () => {
  const LoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))
 
   return (
    <>
      <Topbar />
      {LoggedIn ? <Outlet /> : <Navigate to='/login'/>}
    </>  
  )
}

export default ProtectRoute;
