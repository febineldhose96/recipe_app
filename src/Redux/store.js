import { configureStore } from "@reduxjs/toolkit";
import { HomeSlice } from "../Screens/Home/reducer";
import { ProfileSlice } from "../Screens/Profile/reducer";
import { RecipeDetailsSlice } from "../Screens/RecipeDetails/reducer";

export const store = configureStore({
  reducer: {
    homeReducer: HomeSlice.reducer,
    profileReducer: ProfileSlice.reducer,
    recipeDetails: RecipeDetailsSlice.reducer,
  },
});
