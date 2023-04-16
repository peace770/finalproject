import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { LoginContext } from './FirebaseContext';

export default function NotSignedOnly() {
  const user = React.useContext(LoginContext);

  let navigate = useNavigate();

   if (user) {
    navigate("/dashboard");
  }  
  return (
    <Outlet/>
  );
}
