import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateHomeAPI = createAsyncThunk(
  "updateHome",
  async ({ newHomeUpdate, idHome }) => {
 
    try {
      const tokenJWT = localStorage.getItem("token");
      const url = `/houses/update-house`;

      // Assuming 'data' contains the payload you want to send in the request body
      const response = await axios.put(url, newHomeUpdate, {
        headers: {
          Accept: "*/*",
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
