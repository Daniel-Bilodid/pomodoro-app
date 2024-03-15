import "./App.css";
import Pomodoro from "./components/pomodoro/Pomodoro";
import Timer from "./components/timer/Timer";
import Menu from "./components/menu/Menu";

function App() {
  return (
    <div className="App">
      <div className="app__opacity">
        <Pomodoro />
        <Timer />
      </div>

      <Menu />
    </div>
  );
}

export default App;
