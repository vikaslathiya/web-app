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
    typography: {
        "&": {
            fontWeight: "bold",
            marginLeft: "20px",
            // flexGrow: 1,
        }
    },
    btn: {
        "&": {
            backgroundColor: "#9A1752",
        },
    }
}));