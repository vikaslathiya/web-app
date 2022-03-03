import axios from "axios";
import {loginAction} from "../../store/loginReducer";


export const loginApp = (userName, password) => {
    console.log("login")
    return async (dispatch) => {
        const response = await axios.post("https://d.jeweltrace.in/login/", {
            "username": userName,
            "password": password,
            "type": "web"
        }, {
            "Content-Type": "application/json",
        });
        const data = await response.data;

        if (data.status) {
            localStorage.setItem("user", JSON.stringify(data));
            dispatch(loginAction.login({
                token: data.data.web_token[0],
            }));
            // history.push("/home-page");
        } else {
            alert(data.errors.msg);
        }
    }

}