import React, { useCallback, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { NAV_SCREENS } from "../../Navigations/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Firebase/config";
import { collection, addDoc } from "firebase/firestore";
export default function SignUp(params) {
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
        })
          .then((data) => {
            alert("user created successfully");
            setUserData((e) => Object.keys(e).forEach((i) => (e[i] = "")));
          })
          .catch((e) => alert(e));
      })
      .catch((e) => alert(e));
  };
  return (
    <div className="sign_up">
      <div className="sign_up_wrapper">
        <form className="form-sheet" onSubmit={handleSubmit}>
          <input
            placeholder="first name"
            required
            className="inputs"
            onChange={(e) => handleInput("firstname", e)}
          />
          <input
            placeholder="second name"
            className="inputs"
            onChange={(e) => handleInput("secondname", e)}
          />
          <input
            placeholder="username"
            className="inputs"
            onChange={(e) => handleInput("username", e)}
          />
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
          <input
            placeholder="confirm password"
            type="password"
            required
            className="inputs"
            onChange={(e) => handleInput("confirmpassword", e)}
          />
          <label className="container">
            <input type="checkbox" className="check-box" /> Please accept our
            <Link to={NAV_SCREENS.uploadrecipe}> privacy policy</Link>
          </label>
          <button className="submit_butn">Submit</button>
          <label className="container">
            Already a member? <Link to={NAV_SCREENS.login}> Sign in</Link>
          </label>
        </form>
      </div>
    </div>
  );
}
