import React from 'react';
import Common from './components/common';
import './css/app.css';
import Homepage from './pages/homepage';
import FirebaseContext from "./components/FirebaseContext";
import Some from './some';
import StickyFooter from './components/Personal/StickyFooter';
import Home from './mui material-ui master docs-src_pages_premium-themes_onepirate/Home';
import SignIn from './mui material-ui master docs-src_pages_premium-themes_onepirate/SignIn';
import SignUp from './mui material-ui master docs-src_pages_premium-themes_onepirate/SignUp';

function App() {
  return (
    <FirebaseContext>
    <div className="App" dir='rtl'>
      {/* <Common/> */}
      {/* <Home/> */}
      <SignUp/>
    </div>

    </FirebaseContext>
  );
}

export default App;
