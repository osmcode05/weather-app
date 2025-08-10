import { TextField, Button, InputAdornment } from "@mui/material";
import {SearchOutlined, MyLocation} from "@mui/icons-material";
import { styled } from "@mui/system";
import { useAppContext } from "../Contexts/MyContext";
import { useState } from "react";

const SearchContainer = styled("form")({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "8px",
});

const StyledTextField = styled(TextField)({
  flexGrow: 1,
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    borderRadius: "8px",
    "& fieldset": { border: "none" },
    "& input": { padding: "12px 16px" },
  },
});

const StyledButton = styled(Button)({
  backgroundColor: "#ebebebff",
  borderRadius: "8px",
  padding: "8px 10px",
  "&:hover": {
    backgroundColor: "#fff",
  },
});

export default function SetLocation() {
  const [inputValue, setInputValue] = useState("");
  const { getLocation, setLocation } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) { setLocation((prev) => ({ ...prev, cityName: inputValue })); }
  };
  

  return (
    <SearchContainer onSubmit={handleSubmit}>
      <StyledTextField
        placeholder="Search city or place"
        variant="outlined"
        size="small"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined sx={{ color: "rgba(255, 255, 255, 0.6)" }} />
            </InputAdornment>
          ),
        }}
      />
      <StyledButton startIcon={<MyLocation />} size="large" disableElevation onClick={getLocation} >
        Locate
      </StyledButton>
    </SearchContainer>
  );
}
