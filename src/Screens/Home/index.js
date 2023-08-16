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
import ScrollableList from "../../Components/ScrollableList";
function Home(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const snapShot = state.homeReducer.recipes;
  const userId = state.profileReducer.userDetails.id;
  const qVideos = document.querySelectorAll("video_home");
  const calcVideoNumber = (scrollPositionY) =>
    Math.floor(scrollPositionY / 700);
  const stopPlaying = (videos) =>
    Array.from(videos).forEach((video) => video.pause());
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
        <ScrollableList
          data={[...snapShot, ...snapShot, ...snapShot, ...snapShot]}
          onScroll={(event) => {
            stopPlaying(qVideos);
            qVideos[calcVideoNumber(event.currentTarget.scrollTop)]?.play();
          }}
          renderItem={({ item, index }) => {
            return (
              <div key={index} className="home_item_">
                <PlayerStack
                  videoID="video_home"
                  src={item.video_urls[0]}
                  recipe_name={item.recipe_name}
                  recipe_id={item.id}
                  like_count={item?.favourites.length}
                  favourites={item.favourites}
                  currentUser={userId}
                  isLiked={item?.favourites?.includes(userId) ?? false}
                  profile_name={item.username}
                  post_time={item.createdOn}
                  recipe_props={item}
                  onVideoClick={() => handleItemClick(item)}
                />
              </div>
            );
          }}
        />
      </div>
    </div>
  );
}
export default memo(Home);
