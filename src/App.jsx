import React from "react";
import Common from "./components/common";

import Homepage from "./pages/homepage";
import FirebaseContext, { isUserSignedIn } from "./components/FirebaseContext";
import StickyFooter from "./components/Personal/StickyFooter";
import Home from "./mui material-ui master docs-src_pages_premium-themes_onepirate/Home";
import SignIn from "./mui material-ui master docs-src_pages_premium-themes_onepirate/SignIn";
import SignUp from "./mui material-ui master docs-src_pages_premium-themes_onepirate/SignUp";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./mui material-ui master docs-src_pages_premium-themes_onepirate/ForgotPassword";
import Some from "./components/Some";
import Router from "./Router";
import withRoot from "./mui material-ui master docs-src_pages_premium-themes_onepirate/modules/withRoot";
// import Album from './pages/Album';

function App() {
  try {
    return (
      <FirebaseContext>
        <div
          className="App"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
          dir="rtl"
        >
          <Router />
        </div>
      </FirebaseContext>
    );
  } catch (error) {
    console.log(error);
    return "sorry, we have a problem";
  }
}

export default withRoot(App);
