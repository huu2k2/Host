import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const getBroker = createAsyncThunk("Broker/getBroker", async (depositId) => {
  try {
    const tokenJWT = localStorage.getItem("token");
    const role = jwtDecode(tokenJWT).Role;

    const urlGetAllUser =
      `${process.env.REACT_APP_BASE_URL}/v2/Deposits/get-Information-Agency?DepositID=${depositId}`;
    const response = await axios.get(urlGetAllUser, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${tokenJWT}`, // Thêm token JWT vào tiêu đề Authorization
      },
    });
    console.log("🚀 ~ getDeposit ~ response.data:", response.data.response.data)
    return response.data.response.data;




  } catch (error) {
    throw error;
  }

});

export const BrokerSlice = createSlice({
  name: "Broker",
  initialState: {
    isLoading: false,
    Broker: [],



  },
  reducers: {

    addNewLead: (state, action) => {

      let { newObj } = action.payload;

      state.Broker = [...state.Broker, newObj];
    },

    updateDeposit: (state, action) => {

      let { newObj } = action.payload;

      // Tìm index của đối tượng lead cần thay đổi trong mảng
      const index = state.Broker.findIndex((Broker) => Broker.id === newObj.id);

      if (index !== -1) {
        // Tạo mảng mới với đối tượng lead được thay đổi
        state.Broker = [
          ...state.Broker.slice(0, index),
          newObj,
          ...state.Broker.slice(index + 1),
        ];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBroker.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBroker.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Broker = action.payload; // Lưu danh sách phòng vào state
      })
      .addCase(getBroker.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },

});

export default BrokerSlice.reducer;



