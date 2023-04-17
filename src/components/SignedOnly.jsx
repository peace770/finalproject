import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { LoginContext } from './FirebaseContext';

export default function SignedOnly() {
  const user = React.useContext(LoginContext);

  const [tries, setTries] = useState(0);
  let navigate = useNavigate();

  if (tries >= 10) {
    navigate("/signin");
  } else if (!user) {
    setTimeout(() => setTries(tries + 1), 200);
    return (<div>wait</div>);
  } else  
  return (
    <Outlet/>
  );
}
