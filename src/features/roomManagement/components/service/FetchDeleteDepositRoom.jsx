import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchDeleteDepositRoom = createAsyncThunk(
  "FetchDeleteDepositRoom",
  async (roomId) => {
    try {
      const tokenJWT = localStorage.getItem("token");
      const url = `/deposits/end-of-deposit-by-room-id/${roomId}`;
      const response = await axios.put(url, {
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
