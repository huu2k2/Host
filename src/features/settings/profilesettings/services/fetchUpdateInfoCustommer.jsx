import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUpdateInfoCustommer = createAsyncThunk(
  "fetchUpdateInfoCustommer",
  async (data) => {
    try {
      const tokenJWT = localStorage.getItem("token");
      const url = "/accounts/update-profile";
      const response = await axios.put(url, data, {
        headers: {
          Accept: "*/*",
          'Authorization': `Bearer ${tokenJWT}`,
        },
      });
      return await response.data;
    } catch (error) {
      throw error;
    }
  }
);
