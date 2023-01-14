import { createSlice } from "@reduxjs/toolkit";

import { Blog } from "../utils/types";

type InitialStateType = {
  allBlogs: Blog[];
  isEmpty: boolean;
};

const initialState: InitialStateType = {
  allBlogs: [] as Blog[],
  isEmpty: true,
};

export const AllBlogs = createSlice({
  name: "allblogs",
  initialState,
  reducers: {
    setAllBlogs: (state, action) => {
      state.allBlogs = action.payload;
      state.isEmpty = false;
    },
    resetMyBlogs: (state, action) => {
      state.allBlogs = [];
      state.isEmpty = true;
    },
  },
});

export const { setAllBlogs } = AllBlogs.actions;
export const allBlogsReducer = AllBlogs.reducer;
