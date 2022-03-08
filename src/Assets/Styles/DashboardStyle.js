import {makeStyles} from "@material-ui/core/styles";


export const useStyle = makeStyles(() => ({
    barEffect: {
        fill: "#9a1752",
        "&:hover": {
            fill: "gray",
        }
    }
}))