import React, { useContext } from "react";
import { Outlet, Route, Routes, redirect } from "react-router-dom";
import Home from "./mui material-ui master docs-src_pages_premium-themes_onepirate/Home";
import SignIn from "./mui material-ui master docs-src_pages_premium-themes_onepirate/SignIn";
import SignUp from "./mui material-ui master docs-src_pages_premium-themes_onepirate/SignUp";
import Dashboard from "./pages/Dashboard";
import Terms from "./mui material-ui master docs-src_pages_premium-themes_onepirate/Terms"
import Privacy from "./mui material-ui master docs-src_pages_premium-themes_onepirate/Privacy"
import {
  LoginContext,
  redirectIfUserIsSignedIn,
  redirectIfUserNotSignedUp,
} from "./components/FirebaseContext";
import NotFound404 from "./pages/NotFound404";
import Course from "./pages/Course";
import AppAppBar from "./mui material-ui master docs-src_pages_premium-themes_onepirate/modules/views/AppAppBar";
import Logout from "./pages/Logout";
import SignedOnly from "./components/SignedOnly";
import NotSignedOnly from "./components/NotSignedOnly";
import Landing from "./pages/landing";

export default function Router() {
  const user = useContext(LoginContext);

  const mustSignInLoader = async () => {
    if (!user) {
      return redirect("/signin");
    }
    return null;
  };

  return (
    <Routes>
      <Route element={<AppAppBar />}>

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<h2>About</h2>} />
        <Route path="/*" element={<NotFound404 />} />

        <Route path="/landing/:courseId" element={<Landing/>} />
        <Route path="/terms" element={<Terms/>}/>
        <Route path="/privacy" element={<Privacy/>}/>

        <Route element={<NotSignedOnly />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        <Route element={<SignedOnly />}>
          <Route path="/dashboard" element={user ? <Dashboard /> : <></>} />
          <Route path="/course/:courseId/:componentId" element={<Course />} />
          <Route path="/logout" element={<Logout />} />
        </Route>

      </Route>
    </Routes>
  );
}
