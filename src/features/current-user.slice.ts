import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

const initialState = {} as User;

export const curentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      if (action.payload) {
        return (state = action.payload);
      }
    },
  },
});

export const { setCurrentUser } = curentUserSlice.actions;
export const currentUserReducer = curentUserSlice.reducer;
