import axios from "axios";
import {InventoryAction} from "../../store/InventoryData";

// create columns for table
export const columnsArray = [
    {id: 'sku_number', label: 'SKU', align: 'center', minWidth: 75},
    {id: 'design_code', label: 'Design Code', align: 'center', minWidth: 137},
    {id: 'metal_type', label: 'Material', minWidth: 104, align: 'center'},
    {id: 'design_category', label: 'Design Category', minWidth: 162, align: 'center'},
    {id: 'diamond_weight', label: 'Diamond Ct.', minWidth: 134, align: 'center'},
    {id: 'net_weight', label: 'Net Weight', minWidth: 124, align: 'center'},
    {id: 'sales_value', label: 'Price', minWidth: 84, align: 'center'},
    {id: 'sku_quantity', label: 'SKU Qty', minWidth: 106, align: 'center'},
    {id: 'createdAt', label: 'Date', minWidth: 106, align: 'center'},
    {id: 'action', label: 'Action', minWidth: 100, align: 'center'},
];

export const getInventory = (page, rowsPerPage, sorting, search) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const rootInfo = user.data.rooInfo;
    const webToken = localStorage.getItem("authToken");
    const url = `https://d.jeweltrace.in/sku?id=${rootInfo.companyId}&rootInfo=company&q=${search}&page_no=${page}&limit=${rowsPerPage}&sortBy=${sorting}`;


    return async (dispatch) => {
        dispatch(InventoryAction.setLoading({loading: true}))
        const response = await axios.get(url, {
            headers: {
                "x-web-token": webToken,
            }
        })
        const userData = await response.data;
        dispatch(InventoryAction.getInventoryData({
            userData: userData.data_array,
            user: userData.data,
        }));
        dispatch(InventoryAction.setLoading({loading: false}))
    }
}