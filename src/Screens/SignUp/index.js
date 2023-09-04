import React, { useCallback, useState } from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { NAV_SCREENS } from "../../Navigations/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { toastController } from "../../Components/ToastWidget";
import { useDispatch } from "react-redux";
import { updateUserDetails } from "../Profile/reducer";
import { Messages } from "../../Config/messages";
import { Button, Col, Container, Form, Row } from "reactstrap";
import ScreenHeader from "../../Components/ScreenHeader";
import SideDrawer from "../Launcher/SideDrawer";
export default function SignUp(params) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    firstname: "",
    secondname: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const handleInput = useCallback(
    (i, { target }) => {
      setUserData((e) => ({ ...e, [i]: target.value }));
    },
    [setUserData]
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCredential) => {
        addDoc(collection(db, "users"), {
          username: userData.username,
          email: userData.email,
          firstname: userData.firstname,
          secondname: userData.secondname,
          password: userData.password,
          saved_recipes: [],
          userId: userCredential.user.uid,
          profile_imageUrl: null,
        })
          .then((userCredentials) => {
            setUserData((e) => Object.keys(e).forEach((i) => (e[i] = "")));
            const options = {
              isLoggedIn: true,
              isLoading: false,
              userDetails: { id: userCredential.user.uid },
            };
            toastController.success(Messages.success_Messages.signup);
            dispatch(updateUserDetails(options));
            navigate(NAV_SCREENS.home, { replace: true });

            window.history.replaceState(null, NAV_SCREENS.login);
          })
          .catch((e) => {
            dispatch(updateUserDetails({ isLoading: false }));
            toastController.error(Messages.error_Messages.invalid_password);
          });
      })
      .catch((e) => alert(e));
  };
  const handleNavItemClick = () => {
    navigate(NAV_SCREENS.home);
    window.location.reload();
  };
  return (
    <Container className="p-0 signup_main" fluid>
      <div>
        <ScreenHeader
          type="launcher"
          isDrawerOpen={sidebarOpen}
          onNavItemClick={handleNavItemClick}
          onHambugerClick={() => setSidebarOpen(!sidebarOpen)}
        />
        <SideDrawer
          sidebarOpen={sidebarOpen}
          onDrawerItemClick={handleNavItemClick}
        />
      </div>

      <div className="login_main_sub">
        <Row className="sign_up_text">Sign In</Row>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Row className="login-input-wrapper">
              <Col sm={1} className="login-star-symbol">
                *
              </Col>
              <Col sm={11}>
                <input
                  placeholder="first name"
                  required
                  className="login-inputs"
                  onChange={(e) => handleInput("firstname", e)}
                />
              </Col>
            </Row>
          </Row>
          <Row>
            <Row className="login-input-wrapper">
              <Col sm={1} className="login-star-symbol">
                *
              </Col>
              <Col sm={11}>
                <input
                  placeholder="second name"
                  className="login-inputs"
                  onChange={(e) => handleInput("secondname", e)}
                />
              </Col>
            </Row>
          </Row>
          <Row>
            <Row className="login-input-wrapper">
              <Col sm={1} className="login-star-symbol">
                *
              </Col>
              <Col sm={11}>
                <input
                  placeholder="username"
                  className="login-inputs"
                  onChange={(e) => handleInput("username", e)}
                />
              </Col>
            </Row>
          </Row>
          <Row>
            <Row className="login-input-wrapper">
              <Col sm={1} className="login-star-symbol">
                *
              </Col>
              <Col sm={11}>
                <input
                  placeholder="email"
                  type="email"
                  required
                  className="login-inputs"
                  onChange={(e) => handleInput("email", e)}
                />
              </Col>
            </Row>
          </Row>
          <Row>
            <Row className="login-input-wrapper">
              <Col sm={1} className="login-star-symbol">
                *
              </Col>
              <Col sm={11}>
                <input
                  placeholder="password"
                  type="password"
                  required
                  className="login-inputs"
                  onChange={(e) => handleInput("password", e)}
                />
              </Col>
            </Row>
          </Row>
          <Row>
            <Row className="login-input-wrapper">
              <Col sm={1} className="login-star-symbol">
                *
              </Col>
              <Col sm={11}>
                <input
                  placeholder="confirm password"
                  type="password"
                  required
                  className="login-inputs"
                  onChange={(e) => handleInput("confirmpassword", e)}
                />
              </Col>
            </Row>
          </Row>
          <Col className="login-button-wrapper">
            <label className="container">
              <input type="checkbox" className="check-box" /> Please accept our
              <Link> privacy policy</Link>
            </label>
            <Row>
              <Button color="primary" className="login-button-1">
                Sign Up
              </Button>
            </Row>
            <span>Or</span>
            <Row>
              <Button
                color="primary"
                className="login-button-1"
                onClick={() => navigate(NAV_SCREENS.login)}
              >
                Sign In
              </Button>
            </Row>
          </Col>
        </Form>
      </div>
    </Container>
  );
}
