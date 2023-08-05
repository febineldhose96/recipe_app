import { useEffect, useState } from "react";
import { auth, db } from "../Firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { updateUserDetails } from "../Screens/Profile/reducer";

export default function useCurrentUser() {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      auth.onAuthStateChanged((userLoggedIn) => {
        if (userLoggedIn) {
          const getUsers = async () => {
            const q = query(
              collection(db, "users"),
              where("userId", "==", userLoggedIn.uid)
            );
            const nwDta = await getDocs(q);
            const _fdata =
              nwDta.docs.map((e) => ({ ...e.data(), id: e.id }))[0] ?? {};
            dispatch(updateUserDetails(_fdata));
            setData(_fdata);
          };
          getUsers();
        } else {
          setData(null);
        }
      });
    } catch (error) {
      console.log("useCurrentUser error", error);
    }
  }, [dispatch]);
  return data;
}
