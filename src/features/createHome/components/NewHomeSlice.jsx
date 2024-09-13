import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const insertHome = createAsyncThunk("insertHome", async (data) => {
  try {
    const tokenJWT = localStorage.getItem("token");
    const url = "/Houses/insert-house";

    // Assuming 'data' contains the payload you want to send in the request body
    const response = await axios.post(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenJWT}`, // Add JWT token to Authorization header
      },
    });

    return response.data;
  } catch (error) {
    throw error; // Handle errors if necessary
  }
});

const initialState = {
  infoHome: {
    hostCode: "",
    name: "",
    quantity: 0,
    users: [],

    // 3 biến này sẽ chứa id và tên địa chỉ
    city: {},
    district: {},
    ward: {},
  },
  servicesPolicy: [
    {
      serviceName: "Giá điện",
      price: 0,
      units: ["Kwh"],
      option: "Kwh",
      default: true,
    },
    {
      serviceName: "Giá nước",
      price: 0,
      units: ["Người", "M3", "Phòng"],
      option: "Người",
      default: true,
    },
  
    {
      serviceName: "Phí dịch vụ",
      price: 0,
      units: ["Người", "Phòng"],
      option: "Người",
      default: false,
    },
    {
      serviceName: "Phí xe",
      price: 0,
      units: ["Xe"],
      option: "Xe",
      default: false,
    },
  ],

  note: "",
  utilities: {
    parking: {
      name: "Chỗ để xe",
      checked: false,
    },
    stair: {
      name: "Thang bộ",
      checked: false,
    },
    washing: {
      name: "Máy giặt chung",
      checked: false,
    },
    sercuri: {
      name: "Bảo vệ",
      checked: false,
    },
    wifi: {
      name: "Wifi",
      checked: false,
    },
    elevator: {
      name: "Thang máy",
      checked: false,
    },
    hallwayCleaning: {
      name: "Vệ sinh hành lang",
      checked: false,
    },
    fingerprintLock: {
      name: "Khoá vân tay",
      checked: false,
    },
    freeHours: {
      name: "Giờ giấc tự do",
      checked: false,
    },
    cleanRoom: {
      name: "Dọn vệ sinh phòng",
      checked: false,
    },
    pet: {
      name: "Nuôi thú cưng",
      checked: false,
    },
    cammera: {
      name: "Cammera an ninh",
      checked: false,
    },
  },

  furnitures: [
    {
      furnitureName: "Máy lạnh",
      price: 0,
      checked: false,
      isActived: true,
      isRemove:false
    },
    {
      furnitureName: "Tủ lạnh",
      price: 0,
      checked: false,
      isActived: true,
      isRemove:false
    },
    {
      furnitureName: "Tủ quần áo",
      price: 0,
      checked: false,
      isActived: true,
      isRemove:false
    },
    {
      furnitureName: "Nệm",
      price: 0,
      checked: false,
      isActived: true,
      isRemove:false
    },
    {
      furnitureName: "Máy giặt",
      price: 0,
      checked: false,
      isActived: true,
      isRemove:false
    },
    {
      furnitureName: "Máy nóng lạnh",
      price: 0,
      checked: false,
      isActived: true,
      isRemove:false
    },
    {
      furnitureName: "Kệ bếp",
      price: 0,
      checked: false,
      isActived: true,
      isRemove:false
    },
  ],
  commissionPolicies: [
    {
      month: 0,
      deposit: 0,
      commission: 0,
    },
  ],
  brokerage: {
    // date
    startDate: null,
    endDate: null,
    isAgency: false,
    isExclusive: false,
    pass: "",
    duration: "",
    numberOfVehicle: 0,
    numberOfPeople: 0,
    note: "",
    deposit: 0,
    numberOfDaysKeepRoom: 0,
    commissionPercentage: 0,
    numberPhoneManager: "",
    saleIncentives: "",
  },
  roomImport: [],
};

export const newHomeSlice = createSlice({
  name: "newHome",
  isLoading: false,
  initialState: initialState,

  reducers: {
    resetToInitialState: (state) => {
      return { ...state, ...initialState };
    },

    updateInfoHome: (state, action) => {
      state.infoHome = action.payload;
    },

    initUpdateHome: (state, action) => {
      const { newHomeObj } = action.payload;

      return { ...newHomeObj };
    },

    instertServicePolicy: (state, action) => {
      let { newServicePolicyObj } = action.payload;
      state.servicesPolicy = [...state.servicesPolicy, newServicePolicyObj];
    },

    instertCommissionPolicies: (state, action) => {
      state.commissionPolicies = [
        ...state.commissionPolicies,
        {
          month: 0,
          deposit: 0,
          commission: 0,
        },
      ];
    },

    updateServicePolicy: (state, action) => {
      const { newServicePolicy, index } = action.payload;

      state.servicesPolicy[index] = newServicePolicy;
    },

    deleteServicePolicy: (state, action) => {
      let { index } = action.payload;
      state.servicesPolicy.splice(index, 1);
 
    },

    updateCommissionPolicies: (state, action) => {
      state.commissionPolicies = action.payload;
    },

    deleteCommissionPolicies: (state, action) => {
      let { index } = action.payload;

      state.commissionPolicies.splice(index, 1);
    },
    updateNote: (state, action) => {
      const { note } = action.payload;
      state.note = note;
    },

    updateUtilitie: (state, action) => {
      const { key, checked } = action.payload;
      state.utilities[key].checked = checked;
    },

    insertFurniture: (state, action) => {
      const { newFurnitureObj } = action.payload;
      state.furnitures = [...state.furnitures, {...newFurnitureObj,price:newFurnitureObj.price===null?"Trang bị sẵn":newFurnitureObj.price}];
    },

    updateFurniture: (state, action) => {
      const { newFurnitureObj } = action.payload;

      state.furnitures = newFurnitureObj;
    },

    deleteFurniture: (state, action) => {
      let { index } = action.payload;

      state.furnitures.splice(index, 1);
    },

    updateBrokerage: (state, action) => {
      const { newBrokerageObj } = action.payload;
      state.brokerage = newBrokerageObj;
    },

    updateRoomImport: (state, action) => {
      state.roomImport = action.payload;
    },
  },

  extraReducers: {
    [insertHome.pending]: (state) => {
      state.isLoading = true;
    },
    [insertHome.fulfilled]: (state, action) => {
      state.homes = action.payload;
      state.isLoading = false;
    },
    [insertHome.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  updateServicePolicy,
  deleteServicePolicy,
  instertServicePolicy,
  updateNote,
  updateUtilitie,
  insertFurniture,
  updateFurniture,
  deleteFurniture,
  updateBrokerage,
  updateInfoHome,
  initUpdateHome,
  resetToInitialState,
  instertCommissionPolicies,
  deleteCommissionPolicies,
  updateCommissionPolicies,
  updateRoomImport,
} = newHomeSlice.actions;
export default newHomeSlice.reducer;

export const useSetUpDate = () => {};
