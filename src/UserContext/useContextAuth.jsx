import React, { useContext } from 'react';
import { UserContext } from './UserContext';

const useContextAuth = () => {
  return useContext(UserContext);
}

export default useContextAuth;
