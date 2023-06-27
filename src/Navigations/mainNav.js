// import Home from "../Screens/Home";
import React from "react";
import {
  BrowserRouter as NavigationProvider,
  Routes,
  Route,
} from "react-router-dom";
// import Details from "../Screens/Details";
import UploadRecipe from "../Screens/UploadRecipe";
import Pof404 from "./ErrorPage";
import SignUp from "../Screens/SignUp";
import { NAV_SCREENS } from "./config";
import Login from "../Screens/Login";
function MainNav(params) {
  return (
    <NavigationProvider>
      <Routes>
        <Route path={NAV_SCREENS.signup} element={<SignUp />} />
        <Route path={NAV_SCREENS.login} element={<Login />} />
        <Route path={NAV_SCREENS.uploadrecipe} element={<UploadRecipe />} />
        <Route path="*" element={<Pof404 />} />
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/details" element={<Details />} /> */}
      </Routes>
    </NavigationProvider>
  );
}
export default MainNav;
