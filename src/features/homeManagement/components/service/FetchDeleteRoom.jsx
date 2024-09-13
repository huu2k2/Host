import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchDeleteRoom = createAsyncThunk(
  "FetchDeleteRoom",
  async (id) => {
    try {
      const tokenJWT = localStorage.getItem("token");
      const url = `/rooms/delete-room/${id}`;
      // Assuming 'data' contains the payload you want to send in the request body
      const response = await axios.delete(url, {
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
  }
);
