import React from "react";
import "./styles.css";
import { useSelector } from "react-redux";
import { TbBadge } from "react-icons/tb";
export default function Widget4({ hi = "" }) {
  const state = useSelector((state) => state);
  const snapShot = state.homeReducer.recipes;
  return (
    <div className="dt_w4_main">
      <h3 className="dt_w4_head_txt">Related recipes</h3>
      <div className="dt_w4_view">
        {snapShot.map((recipe, index) => {
          return (
            <div className="dt_w4_container" key={index}>
              <video
                src={recipe.video_urls[0]}
                className="dt_w4_video_container"
              />
              <h3 className="dt_w4_recipename">{recipe.recipe_name}</h3>
              <TbBadge className="dt_w4_badgeicon" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
