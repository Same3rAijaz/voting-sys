import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cnic: null,
    name: null,

}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addDetails: (state, action) => {
            state.name = action.payload.name
            state.cnic = action.payload.cnic

        },
        makeNull: (state) => {
            state.cnic = null
            state.name = null
        }
    },
})

// Action creators are generated for each case reducer function
export const { addDetails, makeNull } = counterSlice.actions

export default counterSlice.reducer