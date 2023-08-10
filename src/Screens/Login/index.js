import React, { useCallback, useState } from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { NAV_SCREENS } from "../../Navigations/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/config";
import { useDispatch } from "react-redux";
import { updateUserDetails } from "../Profile/reducer";
import { toastController } from "../../Components/ToastWidget";
import { Messages } from "../../Config/messages";
export default function Login(params) {
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
  return (
    <div className="login_up">
      <div className="login_wrapper">
        <h3 className="text1">Welcome Back</h3>
        <form className="form-sheet" onSubmit={handleSignIn}>
          <input
            placeholder="email"
            type="email"
            required
            className="inputs"
            onChange={(e) => handleInput("email", e)}
          />
          <input
            placeholder="password"
            type="password"
            required
            className="inputs"
            onChange={(e) => handleInput("password", e)}
          />
          <button className="submit_butn">Sign in</button>
          <label className="container">
            not a member? <Link to={NAV_SCREENS.signup}> Sign up</Link>
          </label>
        </form>
      </div>
    </div>
  );
}
