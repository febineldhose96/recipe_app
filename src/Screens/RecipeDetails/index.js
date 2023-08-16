import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import ImageContainer from "./ImageContainer";
import Widget1 from "./Widget1";
import Widget2 from "./Widget2";
import Widget3 from "./Widget3";
import Widget4 from "./Widget4";
import { doc, updateDoc, arrayUnion } from "@firebase/firestore";
import { db } from "../../Firebase/config";
import { toastController } from "../../Components/ToastWidget";
import { Messages } from "../../Config/messages";
import { ChangeUserDetails } from "../Profile/reducer";
export default function RecipeDetails(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const recipe = state.recipeDetails.recipe_details;
  const username = state.profileReducer.userDetails.username;
  const userId = state.profileReducer.userDetails.id;
  const profile_imageUrl =
    state.profileReducer.userDetails.profile_imageUrl ?? "";
  // saving the recipe
  const handleSaveButn = (obj) => {
    // data bindings
    const options = obj;
    const docRef = doc(db, `users/${userId}`);
    updateDoc(docRef, { saved_recipes: arrayUnion(options) })
      .then((e) => {
        dispatch(ChangeUserDetails());
        toastController.success(Messages.success_Messages.recipe_saved);
      })
      .catch((e) => {
        toastController.error(Messages.error_Messages.normal);
        console.log("saving recipe erorr", e);
      });
  };
  // commenting on the recipe
  const handleComment = (comment) => {
    // data bindings
    const options = {
      comment,
      likes: 0,
      userid: userId,
      userImageUrl: profile_imageUrl,
      username,
    };
    const docRef = doc(db, `recipes/${recipe.id}`);
    updateDoc(docRef, {
      comments: arrayUnion(options),
    })
      .then((e) => {})
      .catch((e) => {
        toastController.error(Messages.error_Messages.normal);
        console.log("comment post recipe erorr", e);
      });
  };
  return (
    <div className="dt_main">
      <div className="dt_container-1">
        <ImageContainer imageUrls={recipe.image_urls} />
        <Widget1
          creatorname={recipe.username}
          recipeID={recipe.id}
          profile_Url={profile_imageUrl}
          recipename={recipe.recipe_name}
          recipe_description={recipe.recipe_description}
          onPostBtnClick={handleComment}
          onSaveClick={handleSaveButn}
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
      <Widget4 onSaveButnClick={handleSaveButn} />
    </div>
  );
}
