import React, { useEffect } from "react";
import "./styles.css";
import {
  collection,
  onSnapshot,
  query,
  where,
  documentId,
} from "firebase/firestore";
import { db } from "../../Firebase/config";
import { toastController } from "../../Components/ToastWidget";
import { useDispatch, useSelector } from "react-redux";
import { Messages } from "../../Config/messages";
import { getSavedRecipes } from "./reducer";

function SavedRecipes() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const savedrecipeIDs = state.profileReducer.userDetails.saved_recipes;
  const snapShot = state.savedRecipesReducer.recipes ?? [];
  useEffect(() => {
    const _q = query(
      collection(db, "recipes"),
      where(documentId(), "in", savedrecipeIDs)
    );

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
      dispatch(getSavedRecipes(recipe_arr));
    });
    return unsubscribe;
  }, [dispatch, savedrecipeIDs]);
  console.log(snapShot);
  return (
    <div className="sr_main">
      <h3>Saved</h3>
      <div>
        <input placeholder="Search recipes" />
      </div>
      <div></div>
    </div>
  );
}

export default SavedRecipes;
