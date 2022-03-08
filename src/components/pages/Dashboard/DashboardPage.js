import React, {Fragment, useCallback, useEffect, useState} from 'react'
import Paper from "@mui/material/Paper";
import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis, Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import {Animation, EventTracker} from '@devexpress/dx-react-chart';
import {barChartData} from "./getChartData";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "@mui/material";

const DashboardPage = () => {
    const [tooltipTarget, setToolTipTarget] = useState(null);
    const [reTry, setReTry] = useState(false);
    const isLoading = useSelector(state => state.dashboardReducer.isLoading);
    const data = useSelector(state => state.dashboardReducer.data);
    const dispatch = useDispatch();

    const fetchSkus = useCallback(() => {
        console.log("recall")
        dispatch(barChartData());
    }, [])

    useEffect(() => {
        fetchSkus();
    }, [fetchSkus]);

    setTimeout(() => {
        setReTry(true);
    }, 5000)

    // const compare = (a, b) => {
    //     if (a.ctg < b.ctg) {
    //         return -1;
    //     }
    //     if (a.ctg > b.ctg) {
    //         return 1;
    //     }
    //     return 0;
    // }
    //     data.sort(compare)


    const changeTooltip = targetItem => setToolTipTarget(targetItem);

    const reloadChartHandler = () => {
        fetchSkus();
        setReTry(false);
    }

    return (
        <Fragment>
            {isLoading &&
                <div style={{textAlign: "center", margin: "225px"}}>
                    {isLoading && !reTry && <h4>Please wait...</h4>}
                    {isLoading && reTry && <h4>Load to failed!</h4>}
                    {isLoading && reTry &&
                        <Button style={{color: "black"}} onClick={reloadChartHandler}>
                            Try Again!
                        </Button>}
                </div>}

            {!isLoading && <Paper>
                <Chart data={data} height={480}>
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