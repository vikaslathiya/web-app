import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
    feedback: {
        position: "absolute",
        bottom: "30px",
        display: "flex",
        left: "45%",
        padding: "15px 20px",
        alignItems: "center",
        backgroundColor: "aliceblue !important",
        boxShadow: "1px 0 3px black, 0 1px 3px black",
        "& h3, & .MuiSvgIcon-root": {
            margin: "0px 6px",
            color: "green",
            fontSize: "16px",
        },
    },
}))