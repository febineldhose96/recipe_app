import React, { memo, useEffect } from "react";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { db } from "../../Firebase/config";
import "./styles.css";
import PlayerStack from "../../Components/PlayerStack";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NAV_SCREENS } from "../../Navigations/config";
import { getSingleDocument } from "../../Firebase/functions";
import { setRecipeDetails } from "../RecipeDetails/reducer";
import { getRecipes } from "./reducer";
import { toastController } from "../../Components/ToastWidget";
import { Messages } from "../../Config/messages";
function Home(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const snapShot = state.homeReducer.recipes;
  const userId = state.profileReducer.userDetails.id;
  useEffect(() => {
    const _q = query(collection(db, "recipes"));
    const unsubscribe = onSnapshot(_q, (querySnapShot) => {
      const recipe_arr = [];
      querySnapShot.forEach(
        (doc) => {
          recipe_arr.push({ ...doc.data(), id: doc.id });
        },
        (error) => {
          toastController.error(Messages.error_Messages.normal);
          console.log("snapshot error", error);
        }
      );
      dispatch(getRecipes(recipe_arr));
    });
    return unsubscribe;
  }, [dispatch]);

  const handleItemClick = async (recipe) => {
    // handle single recipe item click
    const _qry = doc(db, `recipes`, recipe.id);
    const recipe_item = await getSingleDocument({ query: _qry });
    dispatch(setRecipeDetails(recipe_item));
    navigate(`${NAV_SCREENS.recipe_details}${recipe.id}`);
  };
  return (
    <div className="home_main">
      <div className="home_item_wrapper">
        {snapShot.map((recipe, index) => {
          return (
            <div key={index} className="home_item_">
              <PlayerStack
                src={recipe.video_urls[0]}
                controls={false}
                autoPlay={index === 0}
                recipe_name={recipe.recipe_name}
                recipe_id={recipe.id}
                like_count={recipe?.favourites.length}
                favourites={recipe.favourites}
                currentUser={userId}
                isLiked={recipe?.favourites?.includes(userId) ?? false}
                profile_name={recipe.username}
                post_time={recipe.createdOn}
                recipe_props={recipe}
                onVideoClick={() => handleItemClick(recipe)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default memo(Home);
