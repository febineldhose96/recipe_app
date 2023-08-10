import { useEffect } from "react";
import { auth, db } from "../Firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../Screens/Profile/reducer";

export default function useCurrentUser() {
  const state = useSelector((state) => state);
  const isLoggedIn = state.profileReducer.isLoggedIn;
  const isLoading = state.profileReducer.isLoading;
  const dispatch = useDispatch();
  useEffect(() => {
    const storedData = localStorage.getItem("userdata");
    const pareseData = JSON.parse(storedData);
    const options_default = {
      isLoading: false,
      isLoggedIn: false,
      userDetails: {},
    };
    if (pareseData) {
      const options = {
        isLoggedIn: true,
        isLoading: false,
        userDetails: pareseData,
      };
      dispatch(updateUserDetails(options));
    } else {
      try {
        auth.onAuthStateChanged(async (userLoggedIn) => {
          if (userLoggedIn) {
            const q = query(
              collection(db, "users"),
              where("userId", "==", userLoggedIn.uid)
            );
            const nwDta = await getDocs(q);
            const _fdata =
              nwDta.docs.map((e) => ({ ...e.data(), id: e.id }))[0] ?? {};
            delete _fdata.password;
            const options = {
              isLoggedIn: true,
              isLoading: false,
              userDetails: { userId: userLoggedIn.uid, ..._fdata },
            };
            dispatch(updateUserDetails(options));
            localStorage.setItem("userdata", JSON.stringify(options));
          } else {
            dispatch(updateUserDetails(options_default));
          }
        });
      } catch (error) {
        dispatch(updateUserDetails(options_default));
        console.log("useCurrentUser error", error);
      }
    }
  }, [dispatch, isLoggedIn]);
  return { isLoading, isLoggedIn };
}
