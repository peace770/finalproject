import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LoginContext } from "./FirebaseContext";
import { Container, LinearProgress, Typography } from "@mui/material";
import StandartLoadingPage from "./StandartLoadingPage";
  const MAX_TRIES = 10;

export default function SignedOnly() {
  const user = React.useContext(LoginContext);
  const [tries, setTries] = useState(0);
  let navigate = useNavigate();

  if (user) {
    if (tries > 0) setTries(0);
    return <Outlet />;
  } else if (tries >= MAX_TRIES) {
    navigate("/signin");
  } else {
    setTimeout(() => setTries(tries + 1), 200);
    return <StandartLoadingPage primary="טוען..." />;
  }
}
