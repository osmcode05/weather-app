import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../features/weatherSlice";

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;
