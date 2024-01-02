import { createSlice } from "@reduxjs/toolkit";
import { register, login } from "./authThunk";

const initialState = {
  loading: false,
  loggedIn: false,
  error: null,
  signupStatus: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false;
      state.loggedIn = false;
      state.error = null;
      state.signupStatus = "";
      state.isUserVerified = false;
      state.isPasswordUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.signupStatus = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = true;
        state.signupStatus = "success";
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.signupStatus = "failed";
      });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
