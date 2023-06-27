import { useEffect, useState } from "react";
import { auth, db } from "../Firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function useCurrentUser() {
  const [data, setData] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((userLoggedIn) => {
      if (userLoggedIn) {
        const getUsers = async () => {
          const q = query(
            collection(db, "users"),
            where("userId", "==", userLoggedIn.uid)
          );
          const nwDta = await getDocs(q);
          setData(nwDta.docs.map((e) => ({ ...e.data(), id: e.id }))[0]);
        };
        getUsers();
      } else {
        setData(null);
      }
    });
  }, []);
  return data;
}
