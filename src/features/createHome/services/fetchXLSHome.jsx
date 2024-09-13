import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Action creator using createAsyncThunk
export const fetchXLSHome = createAsyncThunk("fetchXLSHome", async (data) => {
  const tokenJWT = localStorage.getItem("token");
  try {
    const response = await axios.post("/Houses/GenerateExcel", data, {
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
        Authorization: `Bearer ${tokenJWT}`,
      },
    });

    const blob = new Blob([response.data], {
      type: "application/octet-stream",
    });

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "ExportHouse.xlsx";
    link.click();
  } catch (error) {
    console.error("Error downloading file:", error);
    throw error; // Re-throw error to be caught by Redux Toolkit
  }
});
