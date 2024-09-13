import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchUpdateCustomer = createAsyncThunk(
  "FetchUpdateCustomer",
  async (data) => {
    try {
      const tokenJWT = localStorage.getItem("token");
      const url = `/customers/update-customer`;

      const response = await axios.put(url, data, {
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
