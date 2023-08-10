import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userDetails: {},
  isLoggedIn: false,
  isLoading: false,
};

const ProfileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    updateUserDetails: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    onLogout: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});
const { updateUserDetails, updateProfileReducer, onLogout } =
  ProfileSlice.actions;
export { ProfileSlice, updateUserDetails, updateProfileReducer, onLogout };
