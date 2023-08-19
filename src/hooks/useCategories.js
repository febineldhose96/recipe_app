import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllCategories } from "../Screens/Category/reducer";
import { db } from "../Firebase/config";
import { collection, onSnapshot, query } from "firebase/firestore";

function useCategories() {
  const dispatch = useDispatch();
  useEffect(() => {
    const _q = query(collection(db, "categories"));
    const unsubscribe = onSnapshot(_q, (querySnapShot) => {
      const recipe_arr = [];
      querySnapShot.forEach(
        (doc) => {
          recipe_arr.push({ ...doc.data(), id: doc.id });
        },
        (error) => {
          console.log("snapshot error", error);
        }
      );
      const payload = {
        categories: recipe_arr,
        dietries: recipe_arr.filter((e) => e.dietType),
        mealType: recipe_arr.filter((e) => e.mealType),
        cuisines: recipe_arr.filter((e) => e.cuisineType),
      };
      dispatch(getAllCategories(payload));
    });
    return unsubscribe;
  }, [dispatch]);
  return {};
}

export default useCategories;
