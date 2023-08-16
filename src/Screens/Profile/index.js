import React from "react";
import { auth } from "../../Firebase/config";
import { toastController } from "../../Components/ToastWidget";
import { Messages } from "../../Config/messages";
import { useDispatch } from "react-redux";
import { onLogout } from "./reducer";
import { useNavigate } from "react-router-dom";
import { NAV_SCREENS } from "../../Navigations/config";
function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    // dispatch(onLogout({ isLoading: true }));
    localStorage.removeItem("userdata");
    const options = {
      isLoggedIn: false,
      isLoading: false,
    };
    auth
      .signOut()
      .then((succ) => {
        navigate(NAV_SCREENS.home, { replace: true });
        window.history.replaceState(null, NAV_SCREENS.profile);
        toastController.success(Messages.success_Messages.logout);
        dispatch(onLogout(options));
      })
      .catch((e) => {
        dispatch(onLogout({ isLoading: false }));
        toastController.error(Messages.error_Messages.normal);
      });
  };
  return (
    <div>
      Profile
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
