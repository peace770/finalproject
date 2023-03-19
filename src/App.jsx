
import Common from './components/common';
import './css/app.css';
import Homepage from './pages/homepage';
import FirebaseContext from "./components/FirebaseContext";
import Some from './some';

function App() {
  return (
    <FirebaseContext>
    <div className="App" dir='rtl'>
      {/* <Common/> */}
        <Some/>
    </div>
    </FirebaseContext>
  );
}

export default App;
