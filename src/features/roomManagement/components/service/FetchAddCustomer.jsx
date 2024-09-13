import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchAddCustomer = createAsyncThunk(
  "FetchAddCustomer",
  async (data) => {
    try {
      const tokenJWT = localStorage.getItem("token");
      const url = `/Custromers/add-customer`;

      const response = await axios.post(url, data, {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenJWT}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error; // Xử lý lỗi nếu có
    }
  }
);
