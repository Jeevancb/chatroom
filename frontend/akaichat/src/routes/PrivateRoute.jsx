import React from 'react'
import { Navigate } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import { useState } from 'react';

export const PrivateRoute = ({Component})=> {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

 // Your authentication logic goes here...
 
  return isAuthenticated ? <Component /> : <Navigate to='/signin' />;
};
  



