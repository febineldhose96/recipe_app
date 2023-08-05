import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  recipes: [],
};

const HomeSlice = createSlice({
  name: "Home",
  initialState,
  reducers: {
    getRecipes: (state, action) => {
      return { ...state, recipes: action.payload };
    },
  },
});
const { getRecipes } = HomeSlice.actions;
export { HomeSlice, getRecipes };
