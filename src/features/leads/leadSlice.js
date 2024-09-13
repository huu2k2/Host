import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

//gọi danh sách nhân viên từ api
// getLeadsContent có thể sửa dụng ở bất kì nơi nào
// /leads/content đinh danh

// export const getLeadsContent = createAsyncThunk('/leads/content', async () => {
// 	const response = await axios.get('/api/users?page=1', {})
//    //console.log(response.data.data)
// 	return response.data;
// })

// gọi ngọ để chỉ hướng dẫn
// Thực hiện cuộc gọi API sử dụng axios
// Thực hiện cuộc gọi API sử dụng axios với token JWT

export const getLeadsContent = createAsyncThunk("GetAllUser", async () => {
  try {
    // Thay đổi tokenJWT thành chuỗi JWT thực tế bạn đã có
    // const { role } = useSelector(state => state.user)
    const tokenJWT = localStorage.getItem("token");
    const role = jwtDecode(tokenJWT).Role;

    const urlGetAllUser =
      `${process.env.REACT_APP_BASE_URL}/accounts/get-all-user-for-admin`;
    const urlGetUserByIDOwner =
      `${process.env.REACT_APP_BASE_URL}/accounts/get-user-by-house-id-holder`;
    const url = role === "Admin" ? urlGetAllUser : urlGetUserByIDOwner;
    const response = await axios.get(url, {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${tokenJWT}`, // Thêm token JWT vào tiêu đề Authorization
      },
    });
 
    return response.data.response;
  } catch (error) {
    throw error; // Xử lý lỗi nếu có
  }
});

export const leadsSlice = createSlice({
  name: "leads",
  initialState: {
    isLoading: false,
    leads: [],
  },
  reducers: {
    addNewLead: (state, action) => {

      let { newUserObj } = action.payload;

      state.leads = [...state.leads, newUserObj];
    },
    updateLead: (state, action) => {

      let { newuserObj } = action.payload;

      // Tìm index của đối tượng lead cần thay đổi trong mảng
      const index = state.leads.findIndex((lead) => lead.id === newuserObj.id);

      if (index !== -1) {
        // Tạo mảng mới với đối tượng lead được thay đổi
        state.leads = [
          ...state.leads.slice(0, index),
          newuserObj,
          ...state.leads.slice(index + 1),
        ];
      }
    },

    deleteLead: (state, action) => {
      let { index } = action.payload;
      state.leads.splice(index, 1);
    },
  },

  extraReducers: {
    [getLeadsContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getLeadsContent.fulfilled]: (state, action) => {
      state.leads = action.payload;
      state.isLoading = false;
    },
    [getLeadsContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addNewLead, deleteLead, updateLead } = leadsSlice.actions;

export default leadsSlice.reducer;
