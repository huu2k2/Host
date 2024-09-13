import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// api lấy thông tin chi tiết nhà
export const FetchDetailsRoom = createAsyncThunk(
  "FetchDetailsRoom",
  async (roomId) => {
    try {

      const tokenJWT = localStorage.getItem("token");

      const url = `/rooms/get-room-details/${roomId}`;

      const response = await axios.get(url, {
        headers: {
          accept: "text/plain",
          Authorization: `Bearer ${tokenJWT}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error; // Xử lý lỗi nếu có
    }
  }
);
