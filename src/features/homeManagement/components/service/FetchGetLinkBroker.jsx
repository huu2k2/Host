import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchGetLinkBroker = createAsyncThunk(
  "FetchGetLinkBroker",
  async () => {
    try {
      const tokenJWT = localStorage.getItem("token");
      const url = `/Houses/GetLinkAgency`;
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
