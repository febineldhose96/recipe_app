import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: true,
  recipes: [],
};

const HomeSlice = createSlice({
  name: "Home",
  initialState,
  reducers: {
    getRecipes: (state, action) => {
      return { ...state, recipes: action.payload };
    },
    alterReducer: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});
const { getRecipes, alterReducer } = HomeSlice.actions;
export { HomeSlice, getRecipes, alterReducer };
