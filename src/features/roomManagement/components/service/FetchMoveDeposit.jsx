import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchMoveDeposit = createAsyncThunk(
  "FetchMoveDeposit",
  async (data) => {
    try {
      const tokenJWT = localStorage.getItem("token");
      const url = `/deposits/change-room-deposit?depositId=${data.depositId}&roomMovedInId=${data.roomId}`;

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
