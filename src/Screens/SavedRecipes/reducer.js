import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  recipes: [],
};

const SavedRecipesSlice = createSlice({
  name: "SavedRecipes",
  initialState,
  reducers: {
    getSavedRecipes: (state, action) => {
      return { ...state, recipes: action.payload };
    },
  },
});
const { getSavedRecipes } = SavedRecipesSlice.actions;
export { SavedRecipesSlice, getSavedRecipes };
