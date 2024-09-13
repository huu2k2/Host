import React from 'react'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { jwtDecode } from "jwt-decode";

export const getDashboadContent = createAsyncThunk("GetDashboad", async()=>{

    try {
        // Thay đổi tokenJWT thành chuỗi JWT thực tế bạn đã có
        // const { role } = useSelector(state => state.user)
        const tokenJWT = localStorage.getItem("token");
        const role = jwtDecode(tokenJWT).Role;
   
        const url =
          `${process.env.REACT_APP_BASE_URL}/v2/HouseHolders/statistics`;
        
          const response = await axios.get(url, {
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${tokenJWT}`, // Thêm token JWT vào tiêu đề Authorization
            },
          });

       
          return response.data.statistics;
        } catch (error) {
          throw error; // Xử lý lỗi nếu có
        }
      });
      export const updateDashboardPeriod = createAsyncThunk(
        "dashboad/updateDashboardPeriod",
        async (newRange, thunkAPI) => {
          try {
            const tokenJWT = localStorage.getItem("token");
      
            const url = `${process.env.REACT_APP_BASE_URL}/v2/HouseHolders/statistics-2`;
      
            const response = await axios.post(
              url,
              {
                start: newRange.startDate,
                end: newRange.endDate,
              },
              {
                headers: {
                  accept: "*/*",
                  Authorization: `Bearer ${tokenJWT}`,
                },
              }
            );

      
            return response.data.statistics;
          } catch (error) {
            throw error;
          }
        }
      );
      
export const DashboadSlice = createSlice({
  name: "dashboad",
  initialState: {
    stats: {},
    loading: false,
    error: null,
    barChartData: {}, // Thêm state mới cho dữ liệu BarChart
  },
   reducers: {},
   extraReducers: (builder) => {
    builder
      .addCase(getDashboadContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDashboadContent.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(getDashboadContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //
      .addCase(updateDashboardPeriod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // .addCase(updateDashboardPeriod.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.stats = action.payload;
      // })
      .addCase(updateDashboardPeriod.fulfilled, (state, action) => {
        state.loading = false;
        state.barChartData = Array.isArray(action.payload) ? action.payload : []; // Đảm bảo là mảng
      })

      .addCase(updateDashboardPeriod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

      
      
  },
});
// export const{addNewLead}= DashboadSlice.action;
export default DashboadSlice.reducer;