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
          top: "-6px",
          fontSize: "0.875rem",
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
            height: 40,
          },
          "& .MuiInputBase-input": {
            padding: "8px 14px",
          },
          "& .MuiSelect-icon": {
            top: "calc(50% - 12px)",
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              maxHeight: 200,
              overflowY: "auto",
            },
          },
        }}
      >
        {options?.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              fontSize: "0.875rem",
              padding: "6px 14px",
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
