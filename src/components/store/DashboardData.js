import {createSlice} from "@reduxjs/toolkit";


const DashboardSlice = createSlice({
    name: "dashboard",
    initialState: {data: [], isLoading: false},
    reducers: {
        getDashboardChart(state, action) {
            state.data = action.payload.chartData;
            state.isLoading = action.payload.load;
        }
    }
})

export const DashboardAction = DashboardSlice.actions;
export default DashboardSlice.reducer;