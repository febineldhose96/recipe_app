import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";

function useSnapShot({ query }) {
  const [snapShot, setSnapShot] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(query, (querySnapShot) => {
      const recipe_arr = [];
      querySnapShot.forEach(
        (doc) => {
          recipe_arr.push({ ...doc.data(), id: doc.id });
        },
        (error) => {
          console.log("snapshot error", error);
          setSnapShot([]);
        }
      );
      setSnapShot(recipe_arr);
    });
    return unsubscribe;
  }, [query, snapShot]);
  return { snapShot };
}

export default useSnapShot;
