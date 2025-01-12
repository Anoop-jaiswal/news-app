import React, { useEffect, useState } from "react";
import {
  Typography,
  Chip,
  Box,
  CircularProgress,
  TextField,
} from "@mui/material";
import NewsList from "./NewsCard";
import { CustomDatePicker } from "../Shared/CustomDatePicker";
import CustomDropdown from "../Shared/CustomDropdown";
import { ArticleList } from "./NewsCard";
import { articles } from "../utils/constant";
import { categories } from "../utils/categories";
import { options } from "../utils/sourceOptions";

const Home = () => {
  const [source, setSource] = useState("");
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const endDate = formatDate(dateRange.end);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    console.log(`Selected Category: ${categoryName}`);
  };

  //api interaction
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [datas, setDatas] = useState([]);
  const apiKey = "f64c11605bc24fa78ed366b76c10f6f6";
  const fetchedNewOrgData = async () => {
    setIsLoading(true); // Start loading
    try {
      const data = await fetch(
        `https://newsapi.org/v2/everything?q=${selectedCategory}&from=2025-01-09&to=${endDate}&sortBy=popularity&apiKey=${apiKey}`
      );

      const response = await data.json();

      if (response?.articles) {
        setDatas(response?.articles);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const guaridianApiKey = "5f10bad3-ff1b-4c2f-904c-7de1b0bd2f93";
  const fetchedDataFromGuardianAPI = async () => {
    setIsLoading(true); // Start loading
    try {
      const data = await fetch(
        `https://content.guardianapis.com/search?q=${selectedCategory}&from-date=${endDate}&api-key=test`
      );

      const response = await data.json();

      if (response.response.results) {
        setDatas(response.response.results);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    if (source === "NewsCred") {
    } else if (source === "TheGuardians") {
      fetchedDataFromGuardianAPI();
    } else {
      // fetchedNewOrgData();
      setSource("NewsOrg");
      setDatas(articles);
    }
  }, [selectedCategory, endDate, source]);

  //filter row

  return (
    <Box p={3} sx={{ backgroundColor: "grey.100", minHeight: "100vh" }}>
      <Box
        display="flex"
        gap={1}
        mb={2}
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
            flex: 1,
            "@media (max-width: 100px)": { flex: "1 1 100%" }, // Mobile compatibility
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
      </Box>

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
