import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import jobSlice from "../features/jobSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobSlice,
  },
});

export default store;
