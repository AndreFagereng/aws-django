import React from "react";
import logo from "./logo.svg";
import "./App.css";
import FirmaOverview from "./Firma";
import { Route, Routes } from "react-router-dom";
import Template from "./EmailTemplate";
import Header from "./Header";

function App() {
  return (
    <div className="App bg-gradient-to-b from-gray-200 to-slate-100 h-screen">
      <Routes>
        <Route path="/app" element={<FirmaOverview></FirmaOverview>} />
        <Route path="templates" element={<Template></Template>} />
      </Routes>
    </div>
  );
}

export default App;
