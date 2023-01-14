import { createSlice } from "@reduxjs/toolkit";

import { Blog } from "../utils/types";

type InitialStateType = {
  myBlogs: Blog[];
  isEmpty: boolean;
};

const initialState: InitialStateType = {
  myBlogs: [] as Blog[],
  isEmpty: true,
};

export const MyBlogs = createSlice({
  name: "myblogs",
  initialState,
  reducers: {
    setMyBlogs: (state, action) => {
      state.myBlogs = action.payload;
      state.isEmpty = false;
    },
    resetMyBlogs: (state) => {
      state.myBlogs = [];
      state.isEmpty = true;
    },
  },
});

export const { setMyBlogs, resetMyBlogs } = MyBlogs.actions;
export const myBlogsReducer = MyBlogs.reducer;
