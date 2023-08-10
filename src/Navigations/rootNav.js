import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NAV_SCREENS } from "./config";
import Login from "../Screens/Login";
import SignUp from "../Screens/SignUp";
import Launcher from "../Screens/Launcher";
function RootApp(params) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Launcher />} />
        <Route path={NAV_SCREENS.login} element={<Login />} />
        <Route path={NAV_SCREENS.signup} element={<SignUp />} />
      </Routes>
    </Router>
  );
}
export default RootApp;
