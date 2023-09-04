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
import Category from "../Screens/Category";
import TestPage from "../Screens/Home/test";
import { Col, Container, Row } from "reactstrap";
function MainNav({ isLoggedIn = false }) {
  return (
    <NavigationProvider>
      <Container fluid>
        <Row className="justify-content-center">
          {isLoggedIn && (
            <Col sm={12} md={2} className="p-0 bottom_nav_bar1">
              <Header />
            </Col>
          )}
          <Col
            sm={12}
            md={isLoggedIn ? 10 : 12}
            className="p-0 bottom_nav_bar2"
          >
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
              <Route
                path={NAV_SCREENS.savedRecipes}
                element={<SavedRecipes />}
              />
              <Route
                path={NAV_SCREENS.uploadrecipe}
                element={<UploadRecipe />}
              />
              <Route path={NAV_SCREENS.category} element={<Category />} />
              <Route path="*" element={<Pof404 />} />
              <Route path={NAV_SCREENS.test} element={<TestPage />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </NavigationProvider>
  );
}
export default MainNav;
