import axios from "axios";
import {DashboardAction} from "../../store/DashboardData";

const webToken = localStorage.getItem("authToken");

export const barChartData = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const rootInfo = user.data.rooInfo;
    const myData = [];
    const category = ["BABY RING", "Berma Ruby", "Earring", "Emerald", "GENTS RING",
        "Pendant", "Peridot", "RING", "Ring", "Ruby", "TOE RING"]

    return async (dispatch) => {
        dispatch(DashboardAction.getDashboardChart({load: true}));

        category.map(async dCat => {
            const url = `https://d.jeweltrace.in/sku?id=${rootInfo.companyId}&rootInfo=company&page_no=0&limit=10&d_cat=${dCat}`;
            const response = await axios.get(url, {
                headers: {
                    "x-web-token": webToken,
                }
            })
            const userData = await response.data;
            myData.push({ctg: dCat, qty: userData.data.totalPage});

            if (myData.length === 11) {
                dispatch(DashboardAction.getDashboardChart({chartData: myData, load: false}));
                console.log("recall Function3")
            }
        })


    }
}