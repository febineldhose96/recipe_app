import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  recipe_details: {},
};

const RecipeDetailsSlice = createSlice({
  name: "RecipeDetails",
  initialState,
  reducers: {
    setRecipeDetails: (state, action) => {
      return { ...state, recipe_details: action.payload };
    },
  },
});
const { setRecipeDetails } = RecipeDetailsSlice.actions;
export { RecipeDetailsSlice, setRecipeDetails };
