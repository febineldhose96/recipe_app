import React, { useCallback, useState } from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { NAV_SCREENS } from "../../Navigations/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/config";
import useCurrentUser from "../../hooks/useCurrentUser";
export default function Login(params) {
  const navigate = useNavigate();
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
    e.preventDefault();
    signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCredentials) => {
        alert("login successfull");
        navigate("/", { replace: true });
        window.history.replaceState(null, NAV_SCREENS.login);
      })
      .catch((e) => alert(e));
  };
  const user = useCurrentUser();
  console.log(user);
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
