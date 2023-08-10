import React from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { NAV_SCREENS } from "../../Navigations/config";
export default function Launcher(params) {
  const navigate = useNavigate();
  return (
    <div className="login_up">
      Login
      <button onClick={() => navigate(NAV_SCREENS.login)}>Login</button>
    </div>
  );
}
