import React, { useState } from "react";
import SharedModal from "../Shared/CustomModel";
import { Box, Button, Typography } from "@mui/material";
import CustomDropdown from "../Shared/CustomDropdown";
import { options } from "../utils/sourceOptions";
import { categories } from "../utils/categories";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  saveAuthor,
  saveCategory,
  saveSource,
} from "../redux/slices/customNewsSlice";

export const NewsContent = ({ onClose }) => {
  const dispatch = useDispatch();
  const [source, setSource] = useState();
  const [category, setCategory] = useState();
  const [author, setAuthor] = useState();

  const categoriesList = categories.map((item) => {
    return {
      value: item.name,
      label: item.name,
    };
  });

  const mockAuthor = [
    { value: "author1", label: "author1" },
    { value: "author2", label: "author2" },
    { value: "author3", label: "author3" },
  ];

  const onClickSave = () => {
    dispatch(saveAuthor(author));
    dispatch(saveCategory(category));
    dispatch(saveSource(source));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Dropdowns */}
      <Box sx={{ marginBottom: 4 }}>
        <CustomDropdown
          label="Source"
          value={source}
          onChange={setSource}
          options={options}
          minWidth={400}
        />
      </Box>
      <Box sx={{ marginBottom: 4 }}>
        <CustomDropdown
          label="Category"
          value={category}
          onChange={setCategory}
          options={categoriesList}
          minWidth={400}
        />
      </Box>

      <Box sx={{ marginBottom: 4 }}>
        <CustomDropdown
          label="Author"
          value={author}
          onChange={setAuthor}
          options={mockAuthor}
          minWidth={400}
        />
      </Box>

      {/* Buttons */}
      <Box
        sx={{
          marginTop: "auto",
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          color="inherit"
          sx={{
            color: "black",
            borderColor: "black",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
          onClick={() => onClose()}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onClickSave()}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export const CustomNews = ({ open, onClose }) => {
  return (
    <SharedModal
      open={open}
      onClose={onClose}
      title="Customize your News here ! "
      content={<NewsContent onClose={onClose} />} // Pass the NewsContent component as JSX
    />
  );
};
