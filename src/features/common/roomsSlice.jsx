import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const getRooms = createAsyncThunk("getRooms", async ({ id, search }) => {
  try {
    // Thay đổi tokenJWT thành chuỗi JWT thực tế bạn đã có
    const tokenJWT = localStorage.getItem("token");
    const role = jwtDecode(tokenJWT).Role;
    const urlUser = `/Rooms/search-room-of-house?houseId=${id}&searchString=${search}`;
    const urlAdmin = `/houses/get-all-houses-for-admin`;

    const url = role === "Admin" ? urlAdmin : urlUser;
    const response = await axios.get(url, {
      headers: {
        accept: "text/plain",
        Authorization: `Bearer ${tokenJWT}`,
      },
    });
    return response.data || [];
  } catch (error) {
    throw error; // Xử lý lỗi nếu có
  }
});

export const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    isLoading: false,
    selectedHome: { name: "", quatity: 0, id: 0 },
    rooms: [],
  },
  reducers: {
    updateSelectedHome: (state, action) => {
      state.selectedHome = action.payload;
    },

    updateRoom_roomsSlice: (state, action) => {
      state.rooms = action.payload;
    },

    deleteRoom_roomsSlice: (state, action) => {
      const indexToDelete = action.payload;
      state.rooms.splice(indexToDelete, 1);
    },
  },

  extraReducers: {
    [getRooms.fulfilled]: (state, action) => {

      // chuyển các status null thành "0"
      let newArray = action.payload.map((obj) => {
        if (obj.status === null) {
          return { ...obj, status: "0" };
        } else {
          return obj;
        }
      });
      state.rooms = newArray;
      state.isLoading = false;
    },
  },
});

export const {
  updateSelectedHome,
  updateRoom_roomsSlice,
  deleteRoom_roomsSlice,
} = roomsSlice.actions;

export default roomsSlice.reducer;
