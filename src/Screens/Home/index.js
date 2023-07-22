import React from "react";
import { collection, query } from "firebase/firestore";
import { db } from "../../Firebase/config";
import "./styles.css";
import PlayerStack from "../../Components/PlayerStack";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useSelector } from "react-redux";
import useSnapShot from "../../hooks/useSnapShot";
export default function Home(props) {
  useCurrentUser();
  const state = useSelector((state) => state.profileReducer);
  const userId = state.userDetails.userId;
  const _q = query(collection(db, "recipes"));
  const { snapShot } = useSnapShot({ query: _q });
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
                profile_name="Febin"
                post_time="9h"
                recipe_props={recipe}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
