import { configureStore } from "@reduxjs/toolkit";
import customNewsReducer from "../slices/customNewsSlice";

const store = configureStore({
  reducer: {
    customNewsStore: customNewsReducer,
  },
});

export default store;
