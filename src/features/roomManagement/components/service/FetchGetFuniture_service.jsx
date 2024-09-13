import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchGetFuniture_service = createAsyncThunk(
  "FetchGetFuniture_service",
  async (roomId) => {
    try {
      // Thay đổi tokenJWT thành chuỗi JWT thực tế bạn đã có
      // const { role } = useSelector(state => state.user)
      const tokenJWT = localStorage.getItem("token");
      const url = `/Deposits/get-services-furnitures-of-room/${roomId}`;
      const response = await axios.get(url, {
        headers: {
          accept: "text/plain",
          Authorization: `Bearer ${tokenJWT}`,
        },
      });
      return response.data.response;
    } catch (error) {
      throw error; // Xử lý lỗi nếu có
    }
  }
);
