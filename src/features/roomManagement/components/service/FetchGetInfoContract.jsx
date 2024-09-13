import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchGetInfoContract = createAsyncThunk(
  "FetchGetInfoContract",
  async (data) => {
    try {
      // Thay đổi tokenJWT thành chuỗi JWT thực tế bạn đã có
      // const { role } = useSelector(state => state.user)
      const tokenJWT = localStorage.getItem("token");
      const url = `/contracts/get-contract/${data.contractId}`;
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
