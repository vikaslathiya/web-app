import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
    tables: {
        "&::-webkit-scrollbar": {
            width: "6px",
            height: "6px"
        },
        "&::-webkit-scrollbar-thumb": {
            borderRadius: "6px",
            backgroundColor: "rgba(0,0,0,.1)"
        },
        "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgb(0 0 0 / 0%)"
        },
    },
    searchBar: {
        "&": {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "6px 18px",
        },
        "& h4": {
            margin: "10px",
        }
    },
    icons: {
        "& .MuiSvgIcon-root": {
            fontSize: "18px",
            margin: "0px 4px",
            cursor: "pointer",
        },
    },
    tableCell: {
        "& .MuiTableCell-root": {
            color: "white",
            background: "#9A1752",
            fontWeight: "bold",
            padding: "10px 0px",
            cursor: "pointer",
            top: 0,
        }
    },
    tableRow: {
        "& .MuiTableCell-root": {
            background: "white",
        }
    }
}))