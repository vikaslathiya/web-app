import {createSlice} from "@reduxjs/toolkit";

const InventorySlice = createSlice({
    name: "inventory",
    initialState: {user: [], userData: []},
    reducers: {
        getInventoryData(state, action) {
            state.user = action.payload.user;
            state.userData = action.payload.userData;
        }
    }
})

export const InventoryAction = InventorySlice.actions;
export default InventorySlice.reducer;