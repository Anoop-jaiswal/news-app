import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  source: "",
  category: "",
  author: "",
};

const customNewsSlice = createSlice({
  name: "newsSlice",
  initialState,
  reducers: {
    saveSource: (state, action) => {
      state.source = action.payload;
    },
    saveCategory: (state, action) => {
      state.category = action.payload;
    },
    saveAuthor: (state, action) => {
      state.author = action.payload;
    },
  },
});

export const { saveAuthor, saveCategory, saveSource } = customNewsSlice.actions;
export default customNewsSlice.reducer;
