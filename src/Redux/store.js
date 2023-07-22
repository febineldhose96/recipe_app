import { configureStore } from "@reduxjs/toolkit";
import { DetailSlice } from "../Screens/Details/reducer";
import { HomeSlice } from "../Screens/Home/reducer";
import { ProfileSlice } from "../Screens/Profile/reducer";

export const store = configureStore({
  reducer: {
    homeReducer: HomeSlice.reducer,
    detailReducer: DetailSlice.reducer,
    profileReducer: ProfileSlice.reducer,
  },
});
