import React, { useContext } from "react";
import { Outlet, Route, Routes, redirect } from "react-router-dom";
import Home from "./mui material-ui master docs-src_pages_premium-themes_onepirate/Home";
import SignIn from "./mui material-ui master docs-src_pages_premium-themes_onepirate/SignIn";
import SignUp from "./mui material-ui master docs-src_pages_premium-themes_onepirate/SignUp";
import Dashboard from "./pages/Dashboard";
import Terms from "./mui material-ui master docs-src_pages_premium-themes_onepirate/Terms";
import Privacy from "./mui material-ui master docs-src_pages_premium-themes_onepirate/Privacy";
import { LoginContext } from "./components/FirebaseContext";
import NotFound404 from "./pages/NotFound404";
import Course from "./pages/Course";
import AppAppBar from "./mui material-ui master docs-src_pages_premium-themes_onepirate/modules/views/AppAppBar";
import Logout from "./pages/Logout";
import SignedOnly from "./components/SignedOnly";
import NotSignedOnly from "./components/NotSignedOnly";
import Landing from "./pages/Landing";
import AppFooter from "./mui material-ui master docs-src_pages_premium-themes_onepirate/modules/views/AppFooter";
import Admin from "./pages/Admin";
import AdminOnly from "./components/AdminOnly";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";

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
      <Route
        element={
          <React.Fragment>
            <AppAppBar />
            <div style={{ flexGrow: 1 }}>
              <Outlet />
            </div>
            <AppFooter />
          </React.Fragment>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/contactus" element={<ContactUs/>} />
        <Route path="/*" element={<NotFound404 />} />

        <Route path="/landing/:courseId" element={<Landing />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />

        <Route element={<NotSignedOnly />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        <Route element={<SignedOnly />}>
          <Route path="/dashboard" element={user ? <Dashboard /> : console.log('------------------------') + "  888888888"} />
          <Route path="/course/:courseId/:componentId?" element={<Course />} />
          <Route path="/logout" element={<Logout />} />
          <Route element={<AdminOnly />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
