import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginReducer";
import userDataReducer from "./userDataReducer";

const store = configureStore({
    reducer: { isLoginReducer: loginReducer, getCustomers: userDataReducer }
})

export default store;