import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchDeleteContractRoom = createAsyncThunk(
  "FetchDeleteContractRoom",
  async (roomId) => {
    try {
      const tokenJWT = localStorage.getItem("token");
      const url = `/contracts/end-of-contract/${roomId}`;
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
