import { configureStore } from "@reduxjs/toolkit";
import { middleware } from "./middleware";

import authReducer from "./slices/authSlice/authSlice";
import movieReducer from "./slices/movieSlice/movieSlice";

const reducer = {
  auth: authReducer,
  movie: movieReducer,
};

export const reduxStore = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(middleware);
  },
});
