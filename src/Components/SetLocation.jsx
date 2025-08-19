// MUI
import { TextField, Button, InputAdornment } from "@mui/material";
import { SearchOutlined, MyLocation } from "@mui/icons-material";
import { styled } from "@mui/system";
// React
import { useState } from "react";

const SearchContainer = styled("form")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  flexWrap: "wrap",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse",
    alignItems: "stretch",
    gap: theme.spacing(1.5),
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  flexGrow: 1,
  minWidth: 0,
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    borderRadius: theme.shape.borderRadius,
    "& fieldset": { border: "none" },
    "& input": { padding: theme.spacing(1.5, 2) },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#ebebebff",
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 1.5),
  whiteSpace: "nowrap",
  "&:hover": {
    backgroundColor: "#fff",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export default function SetLocation({ setLocation, getMyLocation }) {
  const [inputValue, setInputValue] = useState("");

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setLocation({ lat: null, lon: null, cityName: inputValue });
      setInputValue("");
    }
  };

  return (
    <SearchContainer onSubmit={handleSubmit}>

      {/* Search field */}
      <StyledTextField
        placeholder="Search city or place"
        variant="outlined"
        size="small"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ cursor: "pointer" }} onClick={handleSubmit} >
              <SearchOutlined sx={{ color: "rgba(255, 255, 255, 0.6)" }} />
            </InputAdornment>
          ),
        }}
      />

      {/* Get my location Button */}
      <StyledButton disableElevation startIcon={<MyLocation />} onClick={getMyLocation} >
        My Location
      </StyledButton>

    </SearchContainer>
  );
}
