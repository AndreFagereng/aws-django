import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./index.css";
import FirmaOverview from "./Firma";
import { Sidebar } from "./components/Sidebar";

function App() {
  return (
    <div className="App">
      <FirmaOverview></FirmaOverview>
    </div>
  );
}

export default App;
