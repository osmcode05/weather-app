import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Step 1: create async thunk to fetch weather
export const fetchData = createAsyncThunk(
  "data/fetchData",
  async ({ lat, lon, cityName }) => {
    const location = cityName ? cityName : `${lat},${lon}`;
    
    const response = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json`,
      {
        params: {
          key: import.meta.env.VITE_API_KEY,
          q: location,
          days: 3,
        },
      }
    );
    return response.data;
  }
);

// Step 2: create slice
const dataSlice = createSlice({
  name: "data",
  initialState: {
    weatherData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherData = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
