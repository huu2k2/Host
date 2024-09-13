import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchUpdatePrice = createAsyncThunk("FetchUpdatePrice", async (data) => {
  try {
    const tokenJWT = localStorage.getItem("token");
    const url = "/rooms/update-price-for-room";
    // Assuming 'data' contains the payload you want to send in the request body
    const response = await axios.put(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenJWT}`, // Add JWT token to Authorization header
      },
    });

    return response.data;
  } catch (error) {
    throw error; // Handle errors if necessary
  }
});
