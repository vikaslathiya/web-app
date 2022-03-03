import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    users: [],
    editMode: false,
    isLoading: false,
    editable: null
}

const userData = createSlice({
    name: "userDetails",
    initialState: initialState,
    reducers: {
        allCustomers(state, action) {
            state.users = action.payload.userData
        },
        getCustomer(state, action) {
            const user = action.payload.users;

            user.map(user => {
                return state.users.push(user)
            })
        },
        editCustomer(state, action) {
            state.editMode = true;
            state.isLoading = action.payload.load;
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