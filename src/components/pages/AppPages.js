import React, {useCallback, useEffect} from 'react';
import {useParams, Switch, Route, useRouteMatch} from "react-router-dom";

import Inventory from './Inventory';
import Transactions from "./Transactions";
import Customers from "./Customers";
import Reports from "./Reports";
import DashboardPage from './DashboardPage';
import {useDispatch} from 'react-redux';
import {userDataAction} from '../store/userDataReducer';
import AddCustomer from "./AddCustomer";
import axios from 'axios';

const AppPages = (props) => {
    // const editMode = useSelector(state => state.getCustomers.editMode);
    const param = useParams();
    const dispatch = useDispatch();
    const match = useRouteMatch()
    // console.log(editMode);

    const convertedUpper = param.name.slice(0, 1).toUpperCase()
    const upperLetter = param.name.replace(param.name.slice(0, 1), convertedUpper);
    props.titleName(upperLetter)

    const webToken = localStorage.getItem("authToken");


    const fetchCustomers = useCallback(() => {

        axios.get("https://d.jeweltrace.in/customer/new?page_no=0&limit=10&rootInfo=company&id=", {
            headers: {
                "x-web-token": webToken,
            }
        }).then(res => {
            console.log(res)
            dispatch(userDataAction.getCustomer({
                users: res.data.data_array,
            }))
        })

    }, [dispatch, webToken]);

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    switch (param.name) {
        case "dashboard":
            return (
                <>
                    {<DashboardPage/>}
                </>
            );

        case "inventory":
            return <Inventory/>

        case "transactions":
            return <Transactions/>

        case "customers":
            return (
                <Switch>
                    <Route exact path={match.path}><Customers/></Route>
                    <Route path={`${match.path}/add-customer`}><AddCustomer/></Route>
                </Switch>
            );

        case "reports":
            return <Reports/>

        default:
            return;
    }
}


export default AppPages;