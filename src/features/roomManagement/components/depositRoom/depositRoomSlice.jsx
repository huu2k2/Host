import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const INIT = {
  additionalDepositAmount: 0,
  depositPaymentDeadline: "",
  chuongTrinhUuDai: "",
  fullName: "",
  phoneNumber: "",
  birthOfDay: "",
  identification: "",
  dateRange: "",
  issuedBy: "",
  permanentAddress: "",
  signature: "",
  roomId: 0,
  rentalTerm: 0,
  depositDate: "",
  depositAmount: 0,
  rentalPrice: 0,
  rentalStartDate: "",
  numberOfPeople: 0,
  numberOfVehicle: 0,
  furnitures: [
    {
      furnitureId: 0,
      price: 0,
      note: "",
    },
  ],
  notePrivite: "",
  services: [
    {
      serviceId: 0,
      servicePrice: 0,
      dvt: "",
    },
  ],
};
export const depositRoomSlice = createSlice({
  name: "depositRoomSlice",
  initialState: {
    infoDepositRoom: INIT,
  },

  reducers: {
    updateDepositRoomSlice: (state, action) => {
      state.infoDepositRoom = action.payload;
    },
  },

  extraReducers: {},
});

export const { updateDepositRoomSlice } = depositRoomSlice.actions;

export default depositRoomSlice.reducer;
