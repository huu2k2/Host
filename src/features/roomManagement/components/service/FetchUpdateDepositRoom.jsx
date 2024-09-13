import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchUpdateDepositRoom = createAsyncThunk(
  "FetchUpdateDepositRoom",
  async (data) => {
    try {
      const tokenJWT = localStorage.getItem("token");
      const url = `/deposits/update-deposit`;

      const response = await axios.put(url, data, {
        headers: {
          accept: "text/plain",
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
