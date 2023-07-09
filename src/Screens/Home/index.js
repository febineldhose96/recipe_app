import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/config";
export default function Home(props) {
  const state = useSelector((state) => state.HomeReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const recipe_arr = [];
    const path = `recipes`;
    getDocs(collection(db, path)).then((querySnapShot) => {
      querySnapShot.forEach((doc) => {
        recipe_arr.push({ ...doc.data(), id: doc.id });
      });
      setRecipes(recipe_arr);
      console.log(recipe_arr);
    });
  }, []);
  return (
    <div>
      {recipes.map((recipe, index) => {
        console.log("img", recipe.image_urls[0]);
        return (
          <div key={index}>
            {recipe.recipe_name}
            <img src={recipe.image_urls[0]} />
          </div>
        );
      })}
    </div>
  );
}
