// thunk function for edit customer data
import axios from "axios";
import {userDataAction} from "../../store/userDataReducer";

export const editCustomerData = (getData, token) => {
    return async (dispatch) => {
        dispatch(userDataAction.editCustomer({load: true}))

        const sendRequest = async () => {
            const users = await axios.put("https://d.jeweltrace.in/customer/", getData, {
                headers: {
                    "x-web-token": token,
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