import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchGetListImg = createAsyncThunk(
  "FetchGetListImg",
  async (id) => {
    try {
      const tokenJWT = localStorage.getItem("token");
      const url = `/v2/Rooms/get-pictures-of-room/${id}`;
      // Assuming 'data' contains the payload you want to send in the request body
      const response = await axios.get(url, {
        headers: {
          Accept: "text/plain",
          Authorization: `Bearer ${tokenJWT}`, // Add JWT token to Authorization header
        },
      });

      return response.data;
    } catch (error) {
      throw error; // Handle errors if necessary
    }
  }
);
