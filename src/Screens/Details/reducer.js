import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  value: 0,
  newVal: [],
};

const DetailSlice = createSlice({
  name: "Detail",
  initialState,
  reducers: {
    increment: (state) => state.value + 1,
    callsomeapi: (state, action) => {
      return { ...state, newVal: action.payload };
    },
  },
});
const { increment, callsomeapi } = DetailSlice.actions;
export { DetailSlice, increment, callsomeapi };
