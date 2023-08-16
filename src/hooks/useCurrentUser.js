import { useEffect } from "react";
import { auth, db } from "../Firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../Screens/Profile/reducer";

export default function useCurrentUser() {
  const state = useSelector((state) => state);
  const { changeCount, isLoading, isLoggedIn } = state.profileReducer;
  const dispatch = useDispatch();
  useEffect(() => {
    const storedData = localStorage.getItem("userdata");
    const pareseData = JSON.parse(storedData);
    const options_default = {
      isLoading: false,
      isLoggedIn: false,
      userDetails: {},
    };
    console.log("worde");
    if (pareseData && changeCount === 0) {
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
            const unsubscribe = onSnapshot(
              q,
              (querySnapShot) => {
                const user_arr = [];
                querySnapShot.forEach(
                  (doc) => {
                    user_arr.push({ ...doc.data(), id: doc.id });
                  },
                  (error) => {
                    console.log("snapshot error", error);
                  }
                );
                delete user_arr[0].password;
                const options = {
                  isLoggedIn: true,
                  isLoading: false,
                  userDetails: user_arr[0],
                };
                dispatch(updateUserDetails(options));
                localStorage.setItem(
                  "userdata",
                  JSON.stringify(options.userDetails)
                );
              },
              (error) => {
                console.log("useCurrentUser error", error);
              }
            );
            return unsubscribe;
          } else {
            dispatch(updateUserDetails(options_default));
          }
        });
      } catch (error) {
        dispatch(updateUserDetails(options_default));
        console.log("useCurrentUser error", error);
      }
    }
  }, [dispatch, isLoggedIn, changeCount]);
  return { isLoading, isLoggedIn };
}
