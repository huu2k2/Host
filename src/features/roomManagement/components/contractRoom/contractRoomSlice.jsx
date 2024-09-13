import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const INIT = {
  roomId: 0,
  rentalTerm: 0,
  depositDate: "",
  depositAmount: 0,
  rentalPrice: 0,
  rentalStartDate: "",
  numberOfPeople: 0,
  numberOfVehicle: 0,
  fullName: "",
  phoneNumber: "",
  birthOfDay: "",
  identification: "",
  dateRange: "",
  issuedBy: "",
  permanentAddress: "",
  signature: "",
  contractEndDate: "",
  note: "",
  services: [
    {
      serviceId: 0,
      servicePrice: 0,
      dvt: "",
      oldNumber: 0,
    },
  ],
  furnitures: [
    {
      furnitureId: 0,
      price: 0,
      note: "",
    },
  ],
};
export const contractRoomSlice = createSlice({
  name: "contractRoom",
  initialState: {
    isLoading: false,
    infoContractRoom: INIT,
  },
  reducers: {
    updateContractRoomSlice: (state, action) => {

      state.infoContractRoom = action.payload;
    },
    resetContractRoomSlice: (state, action) => {

      state.infoContractRoom = INIT;
    },
  },

  extraReducers: {},
});

export const { updateContractRoomSlice,resetContractRoomSlice } = contractRoomSlice.actions;

export default contractRoomSlice.reducer;
