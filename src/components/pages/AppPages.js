import React, { Fragment, useEffect } from 'react';
import { useParams } from "react-router-dom";

import Inventory from './Inventory';
import Transactions from "./Transactions";
import Customers from "./Customers";
import Reports from "./Reports";
import DeshboardPage from './DashboardPage';
import { useDispatch } from 'react-redux';
import { userDataAction } from '../store/userDataReducer';

const AppPages = (props) => {
    const paramas = useParams();
    const dispatch = useDispatch();

    const convertedUpper = paramas.name.slice(0, 1).toUpperCase()
    const upperLetter = paramas.name.replace(paramas.name.slice(0, 1), convertedUpper);
    props.titleName(upperLetter)

    const jwtToken = localStorage.getItem("authToken");

    useEffect(() => {
        fetch("https://d.jeweltrace.in/customer/new?page_no=0&limit=10&rootInfo=company&id=", {
            headers: {
                "x-web-token": jwtToken,
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(data => {
            console.log(data.data_array)
            dispatch(userDataAction.getCustomer({
                users: data.data_array,
            }))

        })
    }, [])

    switch (paramas.name) {
        case "dashboard":
            return <DeshboardPage />
        case "inventory":
            return <Inventory />
        case "transactions":
            return <Transactions />
        case "customers":
            return <Customers />
        case "reports":
            return <Reports />
    }

    return (
        <Fragment>


        </Fragment>
    )
}


export default AppPages;