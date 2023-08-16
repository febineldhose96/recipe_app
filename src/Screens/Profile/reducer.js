import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userDetails: {},
  isLoggedIn: false,
  isLoading: false,
  changeCount: 0,
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
    ChangeUserDetails: (state, action) => {
      return {
        ...state,
        changeCount: state.changeCount + 1,
      };
    },
  },
});
const { updateUserDetails, updateProfileReducer, onLogout, ChangeUserDetails } =
  ProfileSlice.actions;
export {
  ProfileSlice,
  updateUserDetails,
  updateProfileReducer,
  onLogout,
  ChangeUserDetails,
};
