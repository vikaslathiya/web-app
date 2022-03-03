import axios from "axios";
import {userDataAction} from "../../store/userDataReducer";

const webToken = localStorage.getItem("authToken");

export const data = [];
export const barChartData = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const rootInfo = user.data.rooInfo;
    const category = ["BABY RING", "Berma Ruby", "Earring", "Emerald", "GENTS RING",
        "Pendant", "Peridot", "RING", "Ring", "Ruby", "TOE RING"]

    return async (dispatch) => {
        dispatch(userDataAction.editCustomer({load: true}))
        category.map(async dCat => {
            const url = `https://d.jeweltrace.in/sku?id=${rootInfo.companyId}&rootInfo=company&page_no=0&limit=10&d_cat=${dCat}`;
            const response = await axios.get(url, {
                headers: {
                    "x-web-token": webToken,
                }
            })
            const userData = await response.data;
            data.push({ctg: dCat, qty: userData.data.totalPage});

            if (data.length === 11) {
                dispatch(userDataAction.editCustomer({load: false}));
            }
        })


    }
}