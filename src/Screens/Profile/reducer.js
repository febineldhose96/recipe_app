import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userDetails: {},
};

const ProfileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    updateUserDetails: (state, action) => {
      return {
        ...state,
        userDetails: action.payload,
      };
    },
  },
});
const { updateUserDetails } = ProfileSlice.actions;
export { ProfileSlice, updateUserDetails };
