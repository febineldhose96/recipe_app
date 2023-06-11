import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: 0,
  newVal: [],
};

const HomeSlice = createSlice({
  name: "Home",
  initialState,
  reducers: {
    increment: (state) => state.value + 1,
    callsomeapi: (state, action) => {
      return { ...state, newVal: action.payload };
    },
  },
});
const { increment, callsomeapi } = HomeSlice.actions;
export { HomeSlice, increment, callsomeapi };
