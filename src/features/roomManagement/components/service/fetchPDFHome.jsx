import { createAsyncThunk } from "@reduxjs/toolkit";
import { data } from "autoprefixer";
import axios from "axios";
import { useSelector } from 'react-redux';

// Action creator using createAsyncThunk
export const fetchPDFHome = createAsyncThunk(
  "fetchPDFHome",
  async (datas, { rejectWithValue }) => {


    const tokenJWT = localStorage.getItem("token");

    if (!tokenJWT) {
      return rejectWithValue("Token not found");
    }

    if (!datas.depositId) {
      return rejectWithValue("Invalid data provided");
    }

    try {
      const response = await axios.post(
        `/Deposits/export-pdf/${datas.depositId}`,
        {},
        {
          responseType: "blob",
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
            Authorization: `Bearer ${tokenJWT}`,

          },
        }
      );
      const blob = new Blob([response.data], {
        type: "application/octet-stream",
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `HDCOC-P.${datas.coderoom}-${datas.name}.pdf`;
      link.click();

      // Clean up the URL object
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error downloading file:", error);
      return rejectWithValue(error.message);
    }
  }
);
