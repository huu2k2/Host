import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const getDeposit = createAsyncThunk("deposit/getDeposit", async (houseId) => {
  try {
    const tokenJWT = localStorage.getItem("token");
    const role = jwtDecode(tokenJWT).Role;

    const urlGetAllUser =
      `${process.env.REACT_APP_BASE_URL}/Deposits/house/${houseId}`;
    const response = await axios.get(urlGetAllUser, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${tokenJWT}`, // Thêm token JWT vào tiêu đề Authorization
      },
    });

    return response.data;




  } catch (error) {
    throw error;
  }
});


export const CreateDepositPayment = createAsyncThunk("deposit/createDepositPayment", async (data) => {
  try {
    const tokenJWT = localStorage.getItem("token");

    const urlCreateDepositPayment =
      `${process.env.REACT_APP_BASE_URL}/v2/Bank/CreateDepositPayment`;

    const response = await axios.post(urlCreateDepositPayment, data, {
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
        Authorization: `Bearer ${tokenJWT}`,
      },
    });

    return response.data;

  } catch (error) {
    throw error;
  }
});

export const CreateDepositPaymentFirst = createAsyncThunk("deposit/createDepositPaymentFirst", async (data) => {
  try {
    const tokenJWT = localStorage.getItem("token");

    const urlCreateDepositPayment = `${process.env.REACT_APP_BASE_URL}/v2/Bank/CreateDepositPaymentLinkFirst?DepositID=${data.depositID}`;

    const response = await axios.post(urlCreateDepositPayment, null, {
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
        Authorization: `Bearer ${tokenJWT}`,
      },
    });

    return response.data;

  } catch (error) {
    throw error;
  }
});


export const DepositSlice = createSlice({
  name: "deposits",
  initialState: {
    isLoading: false,
    deposits: [],



  },
  reducers: {

    addNewLead: (state, action) => {

      let { newObj } = action.payload;

      state.deposits = [...state.deposits, newObj];
    },

    updateDeposit: (state, action) => {

      let { newObj } = action.payload;

      // Tìm index của đối tượng lead cần thay đổi trong mảng
      const index = state.deposits.findIndex((deposit) => deposit.id === newObj.id);

      if (index !== -1) {
        // Tạo mảng mới với đối tượng lead được thay đổi
        state.deposits = [
          ...state.deposits.slice(0, index),
          newObj,
          ...state.deposits.slice(index + 1),
        ];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDeposit.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDeposit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deposits = action.payload; // Lưu danh sách phòng vào state
      })
      .addCase(getDeposit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },

});

// export const { updateDeposit } = DepositSlice.actions;
export default DepositSlice.reducer;
