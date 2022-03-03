import axios from "axios";
import {userDataAction} from "../../store/userDataReducer";

const webToken = localStorage.getItem("authToken");

export const FetchAllCustomers = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const rootInfo = user.data.rooInfo;

    return async (dispatch) => {
        await axios.get(`https://d.jeweltrace.in/customer/new?page_no=0&limit=10&rootInfo=company&id=${rootInfo.companyId}&search=`, {
            headers: {
                "x-web-token": webToken,
            }
        }).then(res => {
            dispatch(userDataAction.allCustomers({userData: res.data.data_array}))
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