import React, { useCallback, useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { NAV_SCREENS } from "../../Navigations/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/config";
import { useDispatch } from "react-redux";
import { updateUserDetails } from "../Profile/reducer";
import { toastController } from "../../Components/ToastWidget";
import { Messages } from "../../Config/messages";
import { Button, Col, Container, Form, Row } from "reactstrap";
import ScreenHeader from "../../Components/ScreenHeader";
import SideDrawer from "../Launcher/SideDrawer";
export default function Login(params) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleInput = useCallback(
    (i, { target }) => {
      setUserData((e) => ({ ...e, [i]: target.value }));
    },
    [setUserData]
  );
  const handleSignIn = (e) => {
    dispatch(updateUserDetails({ isLoading: true }));
    e.preventDefault();
    signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCredentials) => {
        const options = {
          isLoggedIn: true,
          isLoading: false,
          userDetails: { id: userCredentials.user.uid },
        };
        dispatch(updateUserDetails(options));
        navigate(NAV_SCREENS.home, { replace: true });
        window.history.replaceState(null, NAV_SCREENS.login);
        toastController.success(Messages.success_Messages.login);
      })
      .catch((e) => {
        dispatch(updateUserDetails({ isLoading: false }));
        toastController.error(Messages.error_Messages.invalid_password);
      });
  };
  const handleNavItemClick = () => {
    navigate(NAV_SCREENS.home);
    window.location.reload();
  };
  return (
    <Container className="p-0 login_main" fluid>
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
        <Row className="login-heading-text">Sign In</Row>
        <Form onSubmit={handleSignIn}>
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
          <Col className="login-button-wrapper">
            <Row>
              <Button color="primary" className="login-button-1">
                Sign In
              </Button>
            </Row>
            <span>Or</span>
            <Row>
              <Button
                color="primary"
                className="login-button-1"
                onClick={() => navigate(NAV_SCREENS.signup)}
              >
                Sign Up
              </Button>
            </Row>
          </Col>
        </Form>
      </div>
    </Container>
  );
}
