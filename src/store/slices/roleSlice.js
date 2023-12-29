import { createSlice } from "@reduxjs/toolkit";

const initialState = "admin";

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setRole(_, action) {
      return action.payload;
    },
  },
});

export const { setRole } = roleSlice.actions;
export default roleSlice.reducer;
