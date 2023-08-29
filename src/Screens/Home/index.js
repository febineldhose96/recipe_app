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
import { alterReducer, getRecipes } from "./reducer";
import { toastController } from "../../Components/ToastWidget";
import { Messages } from "../../Config/messages";
import ScrollableList from "../../Components/ScrollableList";
import { isArray } from "../../Config/checkers";
import Loader from "../../Components/Loader";
import usePlayIntersection from "../../hooks/usePlayerInteraction";
function Home(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const snapShot = state.homeReducer.recipes;
  const userId = state.profileReducer.userDetails.id;
  const categories = state.categoryReducer.categories;
  const qVideos = document.querySelectorAll("video");
  const isLoading = state.homeReducer.isLoading;
  const [observe, containerRef] = usePlayIntersection();
  const calcVideoNumber = (scrollPositionY) =>
    Math.floor(scrollPositionY / 400);
  const stopPlaying = (videos) =>
    Array.from(videos).forEach((video) => video.pause());
  useEffect(() => {
    dispatch(alterReducer({ isLoading: true }));
    const _q = query(collection(db, "recipes"));
    const unsubscribe = onSnapshot(_q, (querySnapShot) => {
      const recipe_arr = [];
      querySnapShot.forEach(
        (doc) => {
          recipe_arr.push({ ...doc.data(), id: doc.id });
        },
        (error) => {
          toastController.error(Messages.error_Messages.normal);
          dispatch(alterReducer({ isLoading: false }));
          console.log("snapshot error", error);
        }
      );
      dispatch(alterReducer({ isLoading: false }));
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
  const handleScroll = (event) => {
    stopPlaying(qVideos);
    qVideos[calcVideoNumber(event.currentTarget.scrollTop)]?.play();
  };
  const isFirstLoading =
    isLoading && isArray(snapShot) && snapShot?.length === 0;
  return (
    <div className="home_main" ref={containerRef}>
      <div className="home_item_wrapper">
        <ul className="home_horrizontal_list">
          {categories.map((item) => {
            return <div className="home_horrizontal_li_item">{item.name} </div>;
          })}
        </ul>
        {isFirstLoading ? (
          <Loader />
        ) : (
          <ScrollableList
            data={snapShot}
            renderItem={({ item, index }) => {
              return (
                <div
                  className="home_item_"
                  onClick={() => handleItemClick(item)}
                >
                  <PlayerStack
                    // ref={observe}
                    key={item}
                    videoID="video"
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
                    // onVideoClick={}
                  />
                </div>
              );
            }}
          />
        )}
      </div>
    </div>
  );
}
export default memo(Home);
