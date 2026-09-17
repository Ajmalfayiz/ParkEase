import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import spotReducer from "./slices/spotSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    spots: spotReducer,
  },
});

export default store;
