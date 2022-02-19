import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper
    },
    arrowIcon: {
        "&": {
            color: "black",
            cursor: "pointer",
        },
    },
    toolbar: {
        "&": {
            backgroundColor: "white",
            color: "#9A1752",
        },
    },
}));