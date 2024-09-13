import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchListCustomer = createAsyncThunk(
  "FetchListCustomer",
  async (id) => {
    try {
      // Thay đổi tokenJWT thành chuỗi JWT thực tế bạn đã có
      // const { role } = useSelector(state => state.user)
      const tokenJWT = localStorage.getItem("token");
      const url = `/Custromers/get-customer-by-room-id/${id}`;
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
