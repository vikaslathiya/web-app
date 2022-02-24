import { createSlice } from "@reduxjs/toolkit";


const userData = createSlice({
    name: "userDetails",
    initialState: { users: [], editMode: false, editable: null },
    reducers: {
        getCustomer(state, action) {
            const user = action.payload.users;

            user.map(user => {
                return state.users.push(user)
            })
        },
        editCustomer(state, action) {
            state.editMode = true;
            state.editable = action.payload.edit;
        },
        closeEditCustomer(state) {
            state.editMode = false;
            state.editable = null;
        }
    }
});



export const userDataAction = userData.actions;
export default userData.reducer;