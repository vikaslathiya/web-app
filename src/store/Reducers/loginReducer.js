import {createSlice} from "@reduxjs/toolkit";

const loggedIn = localStorage.getItem("authToken");

const loginSlice = createSlice({
    name: "userStatus",
    initialState: {isLogin: !!loggedIn},
    reducers: {
        login(state, action) {
            state.isLogin = action.payload.isLogin;
            console.log(state.isLogin)
            localStorage.setItem("authToken", action.payload.token);
        },
        logout(state) {
            state.isLogin = false;
            localStorage.removeItem("authToken");
        }
    }
})

export const loginAction = loginSlice.actions;
export default loginSlice.reducer;