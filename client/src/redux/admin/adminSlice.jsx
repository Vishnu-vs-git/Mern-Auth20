import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAdmin: null,
  isLoading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminLoginSuccess: (state, action) => {
      state.currentAdmin = action.payload;
    },
    adminLogout: (state) => {
      state.currentAdmin = null;
    },
  },
});

export const { adminLoginSuccess, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
