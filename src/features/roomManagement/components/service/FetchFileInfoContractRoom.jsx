import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchFileInfoContractRoom = createAsyncThunk(
  "FetchGetInfoContract",
  async (data) => {
    try {
      // Thay đổi tokenJWT thành chuỗi JWT thực tế bạn đã có
      // const { role } = useSelector(state => state.user)
      const tokenJWT = localStorage.getItem("token");
      const signatureCustome = data.signatureCustome;
      const signatureLeads = data.signatureLeads
      // {depositId}

      const url = `/contracts/export-pdf/${data.depositId}`;
      const response = await axios.post(url, signatureCustome, signatureLeads,{
        headers: {
          accept: "text/plain",
          Authorization: `Bearer ${tokenJWT}`,
          'Content-Type': 'application/xml',
        },
      });
      return response.data;
    } catch (error) {
      throw error; // Xử lý lỗi nếu có
    }
  }
);
