import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "userStatus",
    initialState: { isLogin: false },
    reducers: {
        login(state, action) {
            state.isLogin = action.payload.isLogin;
            localStorage.setItem("authToken", action.payload.token);
        },
        logout(state) {
            state.isLogin = false;
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
            localStorage.removeItem("currentPath")
        }
    }
})

export const loginAction = loginSlice.actions;
export default loginSlice.reducer;