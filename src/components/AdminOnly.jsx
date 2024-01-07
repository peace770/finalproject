import React, { useContext } from "react";
import { LoginContext } from "./FirebaseContext";
import { Outlet, useNavigate } from "react-router-dom";

export default function AdminOnly() {
  let user = useContext(LoginContext);
  let navigate = useNavigate();

  return user && user.admin ? <Outlet /> : navigate("/signin");
}
