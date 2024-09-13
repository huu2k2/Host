import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchInfoCustommer = createAsyncThunk(
  "fetchInfoCustommer",
  async () => {
    try {
      const tokenJWT = localStorage.getItem("token");
      const url = "/accounts/get-profile";
      const response = await axios.get(url, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${tokenJWT}`, 
        },
      });
      return await response.data;
    } catch (error) {
      throw error;
    }
  }
);
