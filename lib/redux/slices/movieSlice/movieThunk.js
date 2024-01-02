import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

export const getMyProfile = createAsyncThunk(
  "user/getUSerProfile",
  async () => {
    try {
      const response = await api.get("users/me/");
      if (response?.data) {
        return response.data;
      }
    } catch (error) {
      console.log("errrr is ", error);
      throw error;
    }
  }
);

export const createMovie = createAsyncThunk(
  "user/createMovie",
  async (formData) => {
    try {
      const response = await api.post("/movies/", formData);
      if (response?.data) {
        return response.data;
      }
    } catch (error) {
      console.log("errrr is ", error);
      throw error;
    }
  }
);

export const updateMovie = createAsyncThunk(
  "movie/id",
  async ({ id, formData }) => {
    try {
      const response = await api.put(`/movies/${id}`, formData);
      if (response?.data) {
        return response.data;
      }
    } catch (error) {
      console.log("errrr is ", error);
      throw error;
    }
  }
);

export const getMovies = createAsyncThunk("user/getMovies", async () => {
  try {
    const response = await api.get("/movies");
    if (response?.data) {
      return response.data;
    }
  } catch (error) {
    console.log("errrr is ", error);
    throw error;
  }
});
