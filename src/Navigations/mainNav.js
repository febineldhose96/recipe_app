import React from "react";
import "./styles.css";
import {
  BrowserRouter as NavigationProvider,
  Routes,
  Route,
} from "react-router-dom";
import UploadRecipe from "../Screens/UploadRecipe";
import Pof404 from "./ErrorPage";
import SignUp from "../Screens/SignUp";
import { NAV_SCREENS } from "./config";
import Login from "../Screens/Login";
import Home from "../Screens/Home";
import Header from "../Components/Header";
import Profile from "../Screens/Profile";
import RecipeDetails from "../Screens/RecipeDetails";
import SavedRecipes from "../Screens/SavedRecipes";
import Launcher from "../Screens/Launcher";
function MainNav({ isLoggedIn = false }) {
  return (
    <NavigationProvider>
      <div className="nav_">
        {isLoggedIn ? (
          <div className="nav_header">
            <Header />
          </div>
        ) : null}
        <div className="nav_screens">
          <Routes>
            <Route
              path={NAV_SCREENS.home}
              element={isLoggedIn ? <Home /> : <Launcher />}
            />
            <Route path={NAV_SCREENS.login} element={<Login />} />
            <Route path={NAV_SCREENS.signup} element={<SignUp />} />
            <Route
              path={NAV_SCREENS.recipe_details}
              element={<RecipeDetails />}
            />
            <Route path={NAV_SCREENS.profile} element={<Profile />} />
            <Route path={NAV_SCREENS.savedRecipes} element={<SavedRecipes />} />
            <Route path={NAV_SCREENS.uploadrecipe} element={<UploadRecipe />} />
            <Route path="*" element={<Pof404 />} />
          </Routes>
        </div>
      </div>
    </NavigationProvider>
  );
}
export default MainNav;
