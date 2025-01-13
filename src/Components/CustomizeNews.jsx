import React, { useState } from "react";
import SharedModal from "../Shared/CustomModel";
import { Box, Button, Snackbar, Alert } from "@mui/material";
import CustomDropdown from "../Shared/CustomDropdown";
import { options } from "../utils/sourceOptions";
import { categories } from "../utils/categories";
import { useDispatch } from "react-redux";
import {
  saveAuthor,
  saveCategory,
  saveSource,
} from "../redux/slices/customNewsSlice";

export const NewsContent = ({ onClose, showSnackbar }) => {
  const dispatch = useDispatch();
  const [source, setSource] = useState();
  const [category, setCategory] = useState();
  const [author, setAuthor] = useState();

  const categoriesList = categories.map((item) => ({
    value: item.name,
    label: item.name,
  }));

  const mockAuthor = [
    { value: "author1", label: "author1" },
    { value: "author2", label: "author2" },
    { value: "author3", label: "author3" },
  ];

  const onClickSave = () => {
    dispatch(saveAuthor(author));
    dispatch(saveCategory(category));
    dispatch(saveSource(source));
    showSnackbar("News customization saved successfully!");
    onClose();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
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
          disabled={!source || !category}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export const CustomNews = ({ open, onClose }) => {
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const showSnackbar = (message) => {
    setSnackbar({ open: true, message });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "" });
  };

  return (
    <>
      <SharedModal
        open={open}
        onClose={onClose}
        title="Customize your News here ! "
        content={<NewsContent onClose={onClose} showSnackbar={showSnackbar} />}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{
            width: "100%",
            backgroundColor: (theme) => theme.palette.success.main,
            color: (theme) => theme.palette.success.contrastText,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};
