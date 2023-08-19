import { configureStore } from "@reduxjs/toolkit";
import { HomeSlice } from "../Screens/Home/reducer";
import { ProfileSlice } from "../Screens/Profile/reducer";
import { RecipeDetailsSlice } from "../Screens/RecipeDetails/reducer";
import { SavedRecipesSlice } from "../Screens/SavedRecipes/reducer";
import { CategorySlice } from "../Screens/Category/reducer";

export const store = configureStore({
  reducer: {
    homeReducer: HomeSlice.reducer,
    profileReducer: ProfileSlice.reducer,
    recipeDetails: RecipeDetailsSlice.reducer,
    categoryReducer: CategorySlice.reducer,
    savedRecipesReducer: SavedRecipesSlice.reducer,
  },
});
