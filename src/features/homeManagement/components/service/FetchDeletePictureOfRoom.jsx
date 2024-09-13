import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchDeletePictureOfRoom = createAsyncThunk(
  "FetchDeletePictureOfRoom",
  async (data) => {
 
    try {
      const tokenJWT = localStorage.getItem("token");
 
      const url = "/v2/Rooms/delete-picture-of-room";
      // Assuming 'data' contains the payload you want to send in the request body
      const response = await axios.post(url, data, {
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenJWT}`, // Add JWT token to Authorization header
        },
      });

      return response.data;
    } catch (error) {
      throw error; // Handle errors if necessary
    }
  }
);


