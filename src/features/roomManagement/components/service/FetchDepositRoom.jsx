import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchDepositRoom = createAsyncThunk(
  "FetchDepositRoom",
  async (data) => {
    try {
      const tokenJWT = localStorage.getItem("token");
      const url = `/deposits/add-deposit`;

      const response = await axios.post(url, data, {
        headers: {
          accept: "text/plain",
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenJWT}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error; // Xử lý lỗi nếu có
    }
  }
);
