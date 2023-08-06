import React, { useCallback, useState } from "react";
import "./styles.css";
import { FaClock, FaShare } from "react-icons/fa";
import { TbBadge, TbChefHat } from "react-icons/tb";
export default function Widget1({
  creatorname = "",
  profile_Url = "",
  recipename = "" | undefined,
  recipe_description = "" | undefined,
  recipe_prepTime = 0,
  recipe_cookTime = 0,
  onSaveClick = () => {},
  onPostBtnClick = () => {},
}) {
  const [comment, setComment] = useState(null);
  const handleInputChange = useCallback(
    ({ target }) => {
      setComment(target.value);
    },
    [setComment]
  );
  const handlePost = useCallback(() => {
    onPostBtnClick(comment);
  }, [onPostBtnClick, comment]);
  const onSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
  };
  return (
    <div className="dt_w_main">
      <div className="dt_wrapper_1">
        <p className="dt_creatorname">
          <img src={profile_Url} className="dt_profile_img" alt="profile_img" />{" "}
          {creatorname}
        </p>
        <div>
          <button className="dt_save_button" onClick={onSaveClick}>
            Save
            <TbBadge className="dt_iconColor" />
          </button>
          <FaShare className="dt_iconColor" />
        </div>
      </div>
      <h2 className="dt_recipename">{recipename}</h2>
      <h3 className="dt_recipedescription">{recipe_description}</h3>
      <div className="dt_wrapper_2">
        <div className="dt_wraper2_inner_1">
          <FaClock className="dt_wraper2_icon" /> Prep : {recipe_prepTime} mins
        </div>
        <div className="dt_wraper2_inner_2">
          <TbChefHat className="dt_wraper2_icon" /> Cook : {recipe_cookTime}{" "}
          mins
        </div>
      </div>

      <form className="dt_wrapper_3" onSubmit={onSubmit}>
        <textarea
          className="dt_wrapper_3_input"
          placeholder="add a comment"
          onChange={handleInputChange}
        />

        <button className="dt_wrapper_3_butn" onClick={handlePost}>
          post
        </button>
      </form>
    </div>
  );
}
