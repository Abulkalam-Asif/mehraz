import { configureStore } from "@reduxjs/toolkit";
import roleSlice from "./slices/roleSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      role: roleSlice,
    },
  });
};

export default makeStore;
