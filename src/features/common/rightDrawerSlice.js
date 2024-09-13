import { createSlice } from '@reduxjs/toolkit'

export const rightDrawerSlice = createSlice({
    name: 'rightDrawer',
    initialState: {
        header: "",
        content:"",  // current  title state management
        isOpen: false,   // right drawer state management for opening closing
        bodyType: "",   // right drawer content management
        extraObject: {},
        index: 0
    },
    reducers: {

        openRightDrawer: (state, action) => {
            const { header, bodyType, extraObject, index, content } = action.payload
            state.isOpen = true
            state.bodyType = bodyType
            state.header = header
            state.content = content
            state.extraObject = extraObject
            state.index = index
        },

        closeRightDrawer: (state, action) => {
            state.isOpen = false
            state.bodyType = ""
            state.header = ""
            state.extraObject = {}
        },

    }
})

export const { openRightDrawer, closeRightDrawer } = rightDrawerSlice.actions

export default rightDrawerSlice.reducer