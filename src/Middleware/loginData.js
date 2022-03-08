import axios from "axios";
import {loginAction} from "../store/Reducers/loginReducer";


export const loginApp = (userName, password) => {
    return async (dispatch) => {
        const response = await axios.post("https://d.jeweltrace.in/login/", {
                "username": userName,
                "password": password,
                "type": "web"
            },
            {
                "Content-Type": "application/json",
            });
        const data = await response.data;

        if (data.status) {
            localStorage.setItem("user", JSON.stringify(data));
            dispatch(loginAction.login({
                token: data.data.web_token[0], isLogin: true
            }));
        } else {
            alert(data.errors.msg);
        }
    }

}