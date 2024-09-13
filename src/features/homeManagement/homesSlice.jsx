import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const getHomes = createAsyncThunk("GetAllHome", async () => {
  try {
    // Thay đổi tokenJWT thành chuỗi JWT thực tế bạn đã có
    // const { role } = useSelector(state => state.user)
    const tokenJWT = localStorage.getItem("token");
    const role = jwtDecode(tokenJWT).Role;
    const urlUser = `/houses/get-all-houses-for-user`;
    const urlAdmin = `/houses/get-all-houses-for-admin`;

    const url = role === "Admin" ? urlAdmin : urlUser;

    const response = await axios.get(url, {
      headers: {
        accept: "text/plain",
        Authorization: `Bearer ${tokenJWT}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error; // Xử lý lỗi nếu có
  }
});

export const homesSlice = createSlice({
  name: "homes",
  initialState: {
    isLoading: false,
    homes: [],
  },
  reducers: {
    deleteHome: (state, action) => {
      let { index } = action.payload;

      state.homes.splice(index, 1);
    },
  },

  extraReducers: {
    [getHomes.pending]: (state) => {
      state.isLoading = true;
    },
    [getHomes.fulfilled]: (state, action) => {
      state.homes = action.payload;
      state.isLoading = false;
    },
    [getHomes.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { deleteHome } = homesSlice.actions;

export default homesSlice.reducer;
