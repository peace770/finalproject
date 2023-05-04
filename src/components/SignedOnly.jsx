import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LoginContext } from "./FirebaseContext";
import { Container, LinearProgress, Typography } from "@mui/material";
import StandartLoadingPage from "./StandartLoadingPage";

export default function SignedOnly() {
  const user = React.useContext(LoginContext);
  const [tries, setTries] = useState(0);
  let navigate = useNavigate();
  const MAX_TRIES = 10;

  if (user) {
    if (tries < MAX_TRIES) setTries(MAX_TRIES);
    return <Outlet />;
  } else if (tries >= 10) {
    navigate("/signin");
  } else {
    setTimeout(() => setTries(tries + 1), 200);
    return <StandartLoadingPage primary="טוען..." />;
  }
}
