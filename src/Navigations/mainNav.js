import Home from "../Screens/Home";
import React from "react";
import {
  BrowserRouter as NavigationProvider,
  Routes,
  Route,
} from "react-router-dom";
import Details from "../Screens/Details";
function MainNav(params) {
  return (
    <NavigationProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </NavigationProvider>
  );
}
export default MainNav;
