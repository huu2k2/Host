import { createSlice } from '@reduxjs/toolkit';

export const searchFunction = createSlice({
    name: 'searchFunction',
    initialState: {
        searchTerm: '',
    },
    reducers: {
        setSearchFunction: (state, action) => {
            state.searchTerm = action.payload;
        },
    },
});

export const { setSearchFunction } = searchFunction.actions;
export default searchFunction.reducer;