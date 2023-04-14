import React from 'react';
import Common from './components/common';
import './css/app.css';
import Homepage from './pages/homepage';
import FirebaseContext, { isUserSignedIn } from "./components/FirebaseContext";
import StickyFooter from './components/Personal/StickyFooter';
import Home from './mui material-ui master docs-src_pages_premium-themes_onepirate/Home';
import SignIn from './mui material-ui master docs-src_pages_premium-themes_onepirate/SignIn';
import SignUp from './mui material-ui master docs-src_pages_premium-themes_onepirate/SignUp';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './mui material-ui master docs-src_pages_premium-themes_onepirate/ForgotPassword';
import Some from './components/Some'
import View from './pages/View';
import Router from './Router';
// import Album from './pages/Album';

function App() {
  return (
    <FirebaseContext>
    <div className="App" dir='rtl'>
      <Router/>
    </div>
    </FirebaseContext>
  );
}

export default App;
