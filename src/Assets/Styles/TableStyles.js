import {makeStyles} from "@material-ui/core/styles";

export const TableStyles = makeStyles(() => ({
    tables: {
        maxHeight: "345px",
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
        "& .MuiTable-root": {
            overflowX: 'hidden',
        }
    },
    tableRow: {
        background: "#9A1752",
        position: "sticky",
        top: 0,
        whiteSpace: "nowrap",
        height: "5px",
        zIndex: 10,
        "& .MuiTableCell-root": {
            background: "transparent",
            padding: "4px 20px",
            zIndex: 2,
        }
    },
    tableBody: {
        "& .MuiTableCell-root": {
            background: "white",
        }
    },
    icons: {
        display: "flex",
        justifyContent: "center",
        "& .MuiSvgIcon-root": {
            fontSize: "18px",
            margin: "0px 4px",
            cursor: "pointer",
            color: "black",
        },
    },
    pagination: {
        "& .MuiToolbar-root p:nth-last-child(2)": {
            marginLeft: "auto"
        },
        "& .MuiToolbar-root .MuiTablePagination-spacer": {
            display: "none"
        }
    },
}))