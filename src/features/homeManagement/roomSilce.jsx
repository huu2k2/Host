import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const roomSlice = createSlice({
  name: "rooms",
  initialState: {
    isLoading: false,
    rooms: [],
  },
  reducers: {},

  extraReducers: {},
});

export const {} = roomSlice.actions;

export default roomSlice.reducer;
