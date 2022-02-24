// thunk function for edit customer data
import axios from "axios";
import {userDataAction} from "./userDataReducer";

export const editCustomerData = (getData, token) => {
    return async (dispatch) => {

        console.log(getData, token);

        const sendRequest = async () => {
            const users = await axios.put("https://d.jeweltrace.in/customer/", getData, {
                headers: {
                    'Content-Type': 'application/json',
                    "x-web-token": token,
                    "Access-Control-Allow-Origin": 'origin-list',
                }
            })

            if (!users.ok) {
                throw new Error("Update customer data failed!");
            }
            console.log(users);
        }

        try {
            await sendRequest();
            dispatch(userDataAction.closeEditCustomer());
        } catch (e) {
            alert(e);
        }

    }
}