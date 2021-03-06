import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
    mainBox: {
        padding: "35px 10px",
        paddingTop: "12px",
        borderRadius: "10px",
        background: "white",
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
        background: "#9A1752",
        position: "sticky",
        top: 0,
        whiteSpace: "nowrap",
        height: "5px",
        zIndex: 10,
        "& .MuiTableCell-root": {
            background: "transparent",
            padding: "4px 20px",
            paddingLeft: 0,
            zIndex: 2,
            color: "white",
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
    },
    dragItem: {
        color: "white",
        fontWeight: 500,
        cursor: "move",
        padding: "8px",
        zIndex: 1000,
        transitionDuration: "300ms",
    },
}))