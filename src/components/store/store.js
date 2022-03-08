import {configureStore} from "@reduxjs/toolkit";
import loginReducer from "./loginReducer";
import userDataReducer from "./userDataReducer";
import InventoryData from "./InventoryData";
import DashboardData from "./DashboardData";

const store = configureStore({
    reducer: {
        isLoginReducer: loginReducer,
        getCustomers: userDataReducer,
        getInventory: InventoryData,
        dashboardReducer: DashboardData,
    }
})

export default store;