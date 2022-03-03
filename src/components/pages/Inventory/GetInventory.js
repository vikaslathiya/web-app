import axios from "axios";
import {InventoryAction} from "../../store/InventoryData";

export const getInventory = (page, rowsPerPage, sorting, search) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const rootInfo = user.data.rooInfo;
    const webToken = localStorage.getItem("authToken");
    const url = `https://d.jeweltrace.in/sku?id=${rootInfo.companyId}&rootInfo=company&q=${search}&page_no=${page}&limit=${rowsPerPage}&sortBy=${sorting}`;


    return async (dispatch) => {
             const response = await axios.get(url, {
            headers: {
                "x-web-token": webToken,
            }
        })
        const userData = await response.data;
            dispatch(InventoryAction.getInventoryData({userData: userData.data_array, user: userData.data}));
    }
}