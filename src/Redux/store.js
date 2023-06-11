import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./Reducers/details.Reducer.js"
import { combineReducers } from 'redux'
const reducer = combineReducers({
    counter: counterReducer,
})
export const store = configureStore({
    reducer
})

export default store