import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const CustomDropdown = ({ label, value, onChange, options }) => {
  return (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-select-label`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label={label}
      >
        {options?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomDropdown;
