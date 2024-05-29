import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Manager from "./views/Manager/Manager";
import Agent from "./views/Agent/Agent";
import HeaderNav from "./components/Header/HeaderNav";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <HeaderNav />
        <Routes>
          <Route exact path="/manager" element={<Manager />} />
          <Route exact path="/agent-1" element={<Agent />} />
          <Route exact path="/agent-2" element={<Agent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
