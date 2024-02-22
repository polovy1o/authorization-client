import { configureStore } from "@reduxjs/toolkit";
//import thunkMiddleware from 'redux-thunk'
import { AlertReducer } from "./slices/AlertSlice";

export const store = configureStore({
    reducer: { Alert: AlertReducer },
    //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware)
})