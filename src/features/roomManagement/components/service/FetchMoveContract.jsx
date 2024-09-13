import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchMoveContract = createAsyncThunk(
  "FetchMoveContract",
  async (data) => {
    try {
      const tokenJWT = localStorage.getItem("token");
      const url = `/contracts/change-room-contract?contractId=${data.contractId}&roomMovedInId=${data.roomId}`;
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
