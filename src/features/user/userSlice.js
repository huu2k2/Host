import { createSlice } from '@reduxjs/toolkit'
import { jwtDecode } from "jwt-decode";


const switchRole = (role) => {

    switch (role) {
        case 'Admin':
            return 0
        case 'HouseHolder':
            return 1
        case 'MainManager':
            return 2
        case 'Manager':
            return 3
        default:
            return 3
    }
}
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userName: "",
        userRole: "",
        token: "",
    },
    reducers: {
        setUser: (state, action) => {

            if (action.payload.token) {

            }
            state.userRole = switchRole(action.payload.role)
            state.token = action.payload.token
        },
    }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer