import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  categories: [],
  dietries: [],
  mealType: [],
  cuisines: [],
};

const CategorySlice = createSlice({
  name: "Categories",
  initialState,
  reducers: {
    getAllCategories: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});
const { getAllCategories } = CategorySlice.actions;
export { CategorySlice, getAllCategories };
