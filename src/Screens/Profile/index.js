import React from "react";
import { auth } from "../../Firebase/config";
import { toastController } from "../../Components/ToastWidget";
import { Messages } from "../../Config/messages";
import { useDispatch, useSelector } from "react-redux";
import { onLogout } from "./reducer";
import { useNavigate } from "react-router-dom";
import { NAV_SCREENS } from "../../Navigations/config";
import "./styles.css";
function Profile() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = state.profileReducer.userDetails.username;
  const userId = state.profileReducer.userDetails.id;
  const profile_imageUrl =
    state.profileReducer.userDetails.profile_imageUrl ?? "";
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
    <div className="pr_main">
      <h3 className="pr_profiletitle"> Profile</h3>
      <div>
        <img src={profile_imageUrl} className="pr_profileImg" />
        <h3 className="pr_profiletitle">{username}</h3>
      </div>
      <div>
        <h3 className="pr_yourRecipe_txt">Your recipes</h3>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
