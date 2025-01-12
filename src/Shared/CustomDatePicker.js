import { Typography, FormHelperText } from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const CustomDatePicker = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  isDisabled,
  maxDate,
  minDate,
  format,
}) => {
  const parseDate = (value) => {
    try {
      let parsedDate = dayjs(value, "DD-MM-YYYY", true);
      if (parsedDate.isValid()) return parsedDate;

      parsedDate = dayjs(value, "DD-MMM-YYYY", true);
      if (parsedDate.isValid()) return parsedDate;

      return null;
    } catch (error) {
      return null;
    }
  };

  const parsedValue = value ? parseDate(value) : null;

  return (
    <>
      <Typography>{label}</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          name={name}
          format={format || "DD-MMM-YYYY"}
          value={parsedValue}
          onChange={onChange}
          onBlur={onBlur}
          disabled={isDisabled}
          maxDate={maxDate}
          minDate={minDate}
          sx={{
            "& .MuiInputBase-root": {
              height: 36, // Adjust the height as needed
            },
            "& .MuiInputBase-input": {
              padding: "8px 14px", // Adjust the padding for better spacing
            },
          }}
        />
        {error && helperText && (
          <FormHelperText error>{helperText}</FormHelperText>
        )}
      </LocalizationProvider>
    </>
  );
};
