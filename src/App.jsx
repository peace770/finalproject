import Common from "./components/common";
import FirebaseContext from "./components/FirebaseContext";
import Tests from "./components/Tests";
import "./css/app.css";
import Homepage from "./pages/homepage";

function App() {
  return (
    <FirebaseContext>
      <div className="App">
        <Tests />
        hel
      </div>
    </FirebaseContext>
  );
}

export default App;
