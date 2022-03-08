import axios from "axios";
import {userDataAction} from "../../store/userDataReducer";

const webToken = localStorage.getItem("authToken");

// create columns for table
export const columnsArray = [
    {id: 'firstName', label: 'NAME', align: 'center', minWidth: 140},
    {id: 'contactNumber', label: 'TEL', align: 'center', minWidth: 100},
    {id: 'email', label: 'EMAIL', minWidth: 150, align: 'center'},
    {id: 'companyName', label: 'COMPANY', minWidth: 100, align: 'center'},
    {id: 'itemTotal', label: 'TOTAL NO. PURCHASES', minWidth: 125, align: 'center'},
    {id: 'priceTotal', label: 'TOTAL PURCHASES VALUE', minWidth: 172, align: 'center'},
    {id: 'action', label: 'ACTION', minWidth: 120, align: 'center'},
];

export const FetchAllCustomers = (page, rowPerPage, search) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const rootInfo = user.data.rooInfo;

    return async (dispatch) => {
        dispatch(userDataAction.loadingState({loading: true}))
        await axios.get(`https://d.jeweltrace.in/customer/new?page_no=${page}&limit=${rowPerPage}&rootInfo=company&id=${rootInfo.companyId}&search=${search}`, {
            headers: {
                "x-web-token": webToken,
            }
        }).then(res => {
            console.log(res)
            dispatch(userDataAction.allCustomers({users: res.data.data_array, userData: res.data.data}))
            dispatch(userDataAction.loadingState({loading: false}))
        })
    }
}

export const AddNewCustomer = async (inputValue) => {
    await axios.post("https://d.jeweltrace.in/customer/", inputValue, {
        headers: {
            'Content-Type': 'application/json',
            "x-web-token": webToken,
        }
    })
}

export const editCustomerData = (getData) => {
    return async (dispatch) => {
        dispatch(userDataAction.editCustomer({load: true}))

        const sendRequest = async () => {
            const users = await axios.put("https://d.jeweltrace.in/customer/", getData, {
                headers: {
                    "x-web-token": webToken,
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                console.log(res);
            })
            console.log(users);
            if (!users.ok) {
                throw new Error("Update customer data failed!");
            }
        }

        try {
            await sendRequest();
            dispatch(userDataAction.editCustomer({load: false}));

        } catch (e) {
            alert(e);
        }
    }

}