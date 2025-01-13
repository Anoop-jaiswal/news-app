import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  source: "",
  category: "",
  author: "",
  authorOptions: [],
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
    saveAuthorOptions: (state, action) => {
      state.authorOptions = action.payload.map((data) => {
        const authorName = data.author || "";
        const truncatedName = authorName.split(" ").slice(0, 4).join(" ");
        return {
          value: truncatedName,
          label: truncatedName,
        };
      });
    },
  },
});

export const { saveAuthor, saveCategory, saveSource, saveAuthorOptions } =
  customNewsSlice.actions;
export default customNewsSlice.reducer;
