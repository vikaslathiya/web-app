import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
    mainBox: {
        padding: "35px 10px",
        paddingTop: "12px",
        background: "#fbfbfb",
        borderRadius: "10px",
    },
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
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "6px 18px",
        marginLeft: 0,
        "& h4": {
            margin: "10px",
        },
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
            padding: "18px 2px",
            cursor: "move",
            top: 0,
            fontSize: "12px"
        }
    },
    dragTableCell: {
        "&": {
            background: "#9A1752",
        },
        "& .MuiTableCell-root": {
            color: "white",
            background: "transparent",
            fontWeight: "bold",
            padding: "18px 2px",
            borderBottomColor: "transparent",
            fontSize: "12px"
        }
    },
    tableRow: {
        "& .MuiTableCell-root": {
            background: "white",
        }
    },
    pagination: {
        "& .MuiToolbar-root p:nth-last-child(2)": {
            marginLeft: "auto"
        },
        "& .MuiToolbar-root .MuiTablePagination-spacer": {
            display: "none"
        }
    }
}))