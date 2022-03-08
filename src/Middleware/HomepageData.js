import axios from "axios";

const webToken = localStorage.getItem("authToken");

export const logoutApp = async () => {
    await axios.post("https://d.jeweltrace.in/login/clearsession", {
            "username": "b1manager",
            "password": "admin",
            "type": "web",
        }, {
            headers: {
                "Content-Type": "application/json",
                "x-web-token": webToken,
            }
        }
    );
    localStorage.removeItem("user");
    localStorage.removeItem("currentPath");
    localStorage.removeItem("selectedIndex");
}
