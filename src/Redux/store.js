import { configureStore } from "@reduxjs/toolkit";
import { DetailSlice } from "../Screens/Details/reducer";
import { HomeSlice } from "../Screens/Home/reducer";

export const store = configureStore({
  reducer: {
    HomeReducer: HomeSlice.reducer,
    DetailReducer: DetailSlice.reducer,
  },
});
