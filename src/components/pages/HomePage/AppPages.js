import React from 'react';
import {useParams, Switch, Route, useRouteMatch} from "react-router-dom";

import Inventory from '../Inventory/Inventory';
import Transactions from "../Transactions/Transactions";
import Customers from "../Customer/Customers";
import Reports from "../Reports/Reports";
import DashboardPage from '../Dashboard/DashboardPage';
import AddCustomer from "../Customer/AddCustomer";

const AppPages = (props) => {
    const param = useParams();
    const match = useRouteMatch()

    const convertedUpper = param.name.slice(0, 1).toUpperCase()
    const upperLetter = param.name.replace(param.name.slice(0, 1), convertedUpper);
    props.titleName(upperLetter)


    switch (param.name) {
        case "dashboard":
            return <DashboardPage/>

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