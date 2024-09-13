import { createSlice } from '@reduxjs/toolkit'

export const roleSlice = createSlice({
    name: 'user',
    initialState: {
        roles:[
            { name: "Admin", id: "Admin" },
            { name: "Chủ nhà", id: "HouseHolder" },
            { name: "Quản lý tổng", id: "MainManager" },
            { name: "Quản lý", id: "Manager" },
        ]
    },
    reducers: {
    }
})

export const { setUser } = roleSlice.actions
export default roleSlice.reducer