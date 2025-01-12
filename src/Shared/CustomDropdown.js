import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const CustomDropdown = ({
  label,
  value,
  onChange,
  options,
  minWidth = 200,
}) => {
  return (
    <FormControl sx={{ minWidth: minWidth }}>
      <InputLabel
        id={`${label}-select-label`}
        sx={{
          top: "-6px", // Adjust vertical alignment
          fontSize: "0.875rem", // Match font size with Select
        }}
      >
        {label}
      </InputLabel>
      <Select
        labelId={`${label}-select-label`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label={label}
        sx={{
          "& .MuiInputBase-root": {
            height: 40, // Adjust the height of the select field
          },
          "& .MuiInputBase-input": {
            padding: "8px 14px", // Adjust padding for the input field
          },
          "& .MuiSelect-icon": {
            top: "calc(50% - 12px)", // Vertically center the dropdown icon
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              maxHeight: 200, // Set max height for the dropdown
              overflowY: "auto", // Enable vertical scrolling
            },
          },
        }}
      >
        {options?.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              fontSize: "0.875rem", // Adjust font size for better readability
              padding: "6px 14px", // Reduce padding for the dropdown items
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomDropdown;
