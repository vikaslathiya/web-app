import {createSlice} from "@reduxjs/toolkit";

const InventorySlice = createSlice({
    name: "inventory",
    initialState: {user: [], userData: [], isLoading: false},
    reducers: {
        getInventoryData(state, action) {
            state.user = action.payload.user;
            state.userData = action.payload.userData;
        },
        setLoading(state, action) {
            state.isLoading = action.payload.loading;
        }
    }
})

export const InventoryAction = InventorySlice.actions;
export default InventorySlice.reducer;