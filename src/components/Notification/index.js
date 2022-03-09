import React, {Fragment} from "react";
import {Paper} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {useStyles} from "../../Assets/Styles/NotificationStyle";

const Notification = (props) => {
    const myStyle = useStyles();

    return (
        <Fragment>
            <Paper className={myStyle.feedback}>
                <CheckCircleIcon/>
                <h3>{props.text}</h3>
            </Paper>
        </Fragment>
    );
}

export default Notification;