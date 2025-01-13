import React, { useEffect, useState } from "react";
import {
  Typography,
  Chip,
  Box,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";
import NewsList from "./NewsCard";
import { CustomDatePicker } from "../Shared/CustomDatePicker";
import CustomDropdown from "../Shared/CustomDropdown";
import { ArticleList } from "./NewsCard";
import { articles } from "../utils/constant";
import { categories } from "../utils/categories";
import { options } from "../utils/sourceOptions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { saveSource, saveCategory } from "../redux/slices/customNewsSlice";
import { useFetchNewsData } from "../hooks/api/useFetchNewsApi";

import { CustomNews } from "./CustomizeNews";

const Home = () => {
  const dispatch = useDispatch();
  // dispatch(saveSource("The Guardians"));

  const store = useSelector((store) => store.customNewsStore);
  console.log(store);

  const [source, setSource] = useState("");
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const [isModelOpen, setIsModelOpen] = useState(false);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const endDate = formatDate(dateRange.end);

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    console.log(`Selected Category: ${categoryName}`);
  };

  //api interaction

  useEffect(() => {
    dispatch(saveCategory("All"));
    dispatch(saveSource("NewsOrg"));
  }, [dispatch]);

  useEffect(() => {
    if (store) {
      setSelectedCategory(store.category);
      setSource(store.source);
    }
  }, [store]);

  const { datas, isLoading } = useFetchNewsData(
    selectedCategory,
    endDate,
    source
  );
  //filter row

  return (
    <Box p={3} sx={{ backgroundColor: "grey.100", minHeight: "100vh" }}>
      <Box
        display="flex"
        gap={1}
        mb={1}
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
      >
        {categories.map((category) => (
          <>
            <Chip
              key={category.name}
              label={category.name}
              icon={category.icon}
              color={category.color}
              clickable
              onClick={() => handleCategoryClick(category.name)}
              sx={{
                fontSize: "0.9rem",
                fontWeight: "500",
                padding: "8px",
                textDecoration:
                  selectedCategory === category.name ? "underline" : "none",
                textUnderlineOffset: "4px",
                textDecorationColor:
                  selectedCategory === category.name ? "black" : "transparent", // Use black for underline color
              }}
            />
          </>
        ))}
      </Box>

      {/* filte row */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
        padding={2}
        flexWrap="wrap"
      >
        {/* Search Bar */}
        <TextField
          label="Search by Category or keywords"
          variant="outlined"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          fullWidth
          sx={{
            minWidth: 200,
            flex: 1,
            "& .MuiOutlinedInput-root": {
              height: 40, // Adjust overall height of the input
              display: "flex", // Ensures flex alignment for content
              alignItems: "center", // Aligns content vertically
              "& input": {
                padding: "8px 14px", // Adjusts input padding
                height: "unset", // Removes default height to allow proper centering
              },
            },
            "@media (max-width: 100px)": { flex: "1 1 100%" },
          }}
        />

        {/* Author Filter */}
        <CustomDropdown
          label="Source"
          value={source}
          onChange={setSource}
          options={options}
        />

        {/* Date Range Filter */}
        <Box display="flex" alignItems="center" gap={1}>
          <CustomDatePicker
            value={dateRange.end}
            onChange={(newValue) =>
              setDateRange((prev) => ({ ...prev, end: newValue }))
            }
            sx={{
              "@media (max-width: 600px)": { flex: "1 1 100%" }, // Mobile compatibility
            }}
          />
        </Box>
        <Button variant="contained" onClick={() => setIsModelOpen(true)}>
          Customize News
        </Button>
      </Box>

      <CustomNews open={isModelOpen} onClose={() => setIsModelOpen(false)} />
      {/* loading */}
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress />
        </Box>
      ) : datas?.length > 0 ? (
        source === "TheGuardians" ? (
          <ArticleList articles={datas} />
        ) : (
          <NewsList articles={datas} />
        )
      ) : (
        <Typography textAlign="center" color="textSecondary">
          No articles found for this category.
        </Typography>
      )}
    </Box>
  );
};

export default Home;
