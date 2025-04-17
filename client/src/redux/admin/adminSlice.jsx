import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAdmin: null,
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin(state, action) {
      state.currentAdmin = action.payload;
    },
    clearAdmin(state) {
      state.currentAdmin = null;
    },
    updateAdminProfile(state, action) {
      const { username, email } = action.payload;
      if (state.currentAdmin) {
        state.currentAdmin.username = username;
        state.currentAdmin.email = email;
      }
    },
    updateAdminProfilePicture(state, action) {
      if (state.currentAdmin) {
        state.currentAdmin.profilePicture = action.payload;
      }
    },
  },
});

export const {
  setAdmin,
  clearAdmin,
  updateAdminProfile,
  updateAdminProfilePicture,
} = adminSlice.actions;

export default adminSlice.reducer;
