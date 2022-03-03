import React, {Fragment, useEffect, useState} from 'react'
import Paper from "@mui/material/Paper";
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis, Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import {Animation, EventTracker} from '@devexpress/dx-react-chart';
import axios from "axios";

// import {useDispatch, useSelector} from "react-redux";
// import {getInventory} from "../store/EditData";

const DashboardPage = () => {
    const [chartData, setChartData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [tooltipTarget, setToolTipTarget] = useState(null);
    // const user = useSelector(state => state.getInventory.user)
    // const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem("user"));
    const rootInfo = user.data.rooInfo;

    const data = [];
    const fetchSkus = () => {
        setIsLoading(true);
        const webToken = localStorage.getItem("authToken");
        const category = ["BABY RING", "Berma Ruby", "Earring", "Emerald", "GENTS RING", "Pendant", "Peridot", "RING", "Ring", "Ruby", "TOE RING"]
        category.map(async dCat => {
            const response = await axios.get(`https://d.jeweltrace.in/sku?id=${rootInfo.companyId}&rootInfo=company&page_no=0&limit=10&d_cat=${dCat}`, {
                headers: {
                    "x-web-token": webToken,
                }
            })
            const userData = await response.data;
            data.push({ctg: dCat, qty: userData.data.totalPage});
        })
        // eslint-disable-next-line array-callback-return
        // category.map(dCat => {
        //     dispatch(getInventory(0, 10, dCat))
        // })

    }

    useEffect(() => {
        fetchSkus();
        setTimeout(() => {
            console.log(user)
            setChartData(data);
            setIsLoading(false);
            chartData.sort();
        }, 4000)
    }, []);



    const changeTooltip = targetItem => setToolTipTarget(targetItem);

    return (
        <Fragment>
            {isLoading && <div style={{textAlign: "center", margin: "225px"}}>
                <h4>Please wait...</h4>
            </div>}
            {!isLoading && <Paper>
                <Chart data={chartData} height={480}>
                    <ArgumentAxis/>
                    <ValueAxis/>
                    <BarSeries
                        valueField="qty"
                        argumentField="ctg"
                    />
                    <Title text="Design Category Vs SKU Quantity"/>
                    <EventTracker/>
                    <Tooltip
                        targetItem={tooltipTarget}
                        onTargetItemChange={changeTooltip}
                    />
                    <Animation/>
                </Chart>
            </Paper>}
        </Fragment>
    );
}

export default DashboardPage;