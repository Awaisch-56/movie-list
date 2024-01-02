import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

export const login = createAsyncThunk("auth/login", async (credentials) => {
  try {
    const response = await api.post("auth/login/", credentials);
    if (response?.data) {
      const { access_token } = response?.data;
      localStorage.setItem("token", access_token);
      return response.data;
    }
  } catch (error) {
    console.log("errrr is ", error);
    localStorage.removeItem("token");
    throw error;
  }
});

export const register = createAsyncThunk("auth/register", async (user) => {
  try {
    const response = await api.post("auth/register/", user);
    if (response?.data) {
      const { access_token } = response?.data;
      console.log("Token is: ", access_token);
      localStorage.setItem("token", access_token);
      return response.data;
    }
  } catch (error) {
    console.log("errrr is ", error);
    localStorage.removeItem("token");
    throw error;
  }
});
