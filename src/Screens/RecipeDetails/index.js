import React from "react";
import { useSelector } from "react-redux";
import "./styles.css";
import ImageContainer from "./ImageContainer";
import Widget1 from "./Widget1";
import Widget2 from "./Widget2";
import Widget3 from "./Widget3";
import Widget4 from "./Widget4";
export default function RecipeDetails(props) {
  const state = useSelector((state) => state);
  const recipe = state.recipeDetails.recipe_details;
  const profile_imageUrl =
    state.profileReducer.userDetails.profile_imageUrl ?? "";
  return (
    <div className="dt_main">
      <div className="dt_container-1">
        <ImageContainer imageUrls={recipe.image_urls} />
        <Widget1
          creatorname={recipe.username}
          profile_Url={profile_imageUrl}
          recipename={recipe.recipe_name}
          recipe_description={recipe.recipe_description}
        />
      </div>
      <div className="dt_container-2">
        <Widget2
          ingredients={recipe.recipe_ingredients}
          instructions={recipe.recipe_instructions}
          number_of_portions={recipe.recipe_number_of_portions}
        />
        <Widget3 />
      </div>
      <Widget4 />
    </div>
  );
}
