import {configureStore} from "@reduxjs/toolkit";
import loginReducer from "./loginReducer";
import userDataReducer from "./userDataReducer";
import InventoryData from "../pages/Inventory/InventoryData";

const store = configureStore({
    reducer: {
        isLoginReducer: loginReducer,
        getCustomers: userDataReducer,
        getInventory: InventoryData
    }
})

export default store;