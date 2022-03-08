import {configureStore} from "@reduxjs/toolkit";
import loginReducer from "./Reducers/loginReducer";
import userDataReducer from "./Reducers/userDataReducer";
import InventoryData from "./Reducers/InventoryData";
import DashboardData from "./Reducers/DashboardData";

const store = configureStore({
    reducer: {
        isLoginReducer: loginReducer,
        getCustomers: userDataReducer,
        getInventory: InventoryData,
        dashboardReducer: DashboardData,
    }
})

export default store;