import { createSlice } from "@reduxjs/toolkit";

const userData = createSlice({
    name: "userDetails",
    initialState: { users: [] },
    reducers: {
        getCustomer(state, action) {
            const user = action.payload.users;

            user.map(user => {
                state.users.push({
                    name: `${user.firstName} ${user.familyName}`,
                    tel: user.contactNumber,
                    email: user.email,
                    company: user.companyName,
                    totalPur: user.itemTotal,
                    totalValue: user.priceTotal,
                    id: user._id
                })
            })
        }
    }
})

export const userDataAction = userData.actions;
export default userData.reducer;