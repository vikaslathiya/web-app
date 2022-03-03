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
import {barChartData, data} from "./getChartData";
import {useDispatch, useSelector} from "react-redux";

const DashboardPage = () => {
    const [chartData, setChartData] = useState([]);
    const [tooltipTarget, setToolTipTarget] = useState(null);
    const isLoading = useSelector(state => state.getCustomers.isLoading);
    const dispatch = useDispatch();

    const fetchSkus = async () => {
        await dispatch(barChartData());
    }

    useEffect(() => {
        fetchSkus();
        setChartData(data);
    }, []);


    const compare = (a, b) => {
        if (a.ctg < b.ctg) {
            return -1;
        }
        if (a.ctg > b.ctg) {
            return 1;
        }
        return 0;
    }
    chartData.sort(compare)

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