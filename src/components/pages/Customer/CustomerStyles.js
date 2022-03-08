import {makeStyles} from "@material-ui/core/styles";
import {styled} from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

// customer page mui styles
export const useStyles = makeStyles(() => ({
    mainBox: {
        padding: "35px 10px",
        paddingTop: "12px",
        background: "#fbfbfb",
        borderRadius: "10px",
        boxShadow: "0 0 2px black",
    },
    icons: {
        "& .MuiSvgIcon-root": {
            fontSize: "18px",
            margin: "0px 4px",
            cursor: "pointer",
        },
    },
    tableTop: {
        "&": {
            display: "flex",
            width: "99.5%",
        },
        "& h4": {
            margin: "14px auto",
            marginLeft: "5px",
        },
        "& button": {
            margin: "8px 0px",
            fontSize: "13px",
            color: "white",
            backgroundColor: "#9A1752",
            "&:hover": {
                backgroundColor: "#f8d3e4",
                color: "#9A1752"
            }
        },
    },
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
        "& .MuiTableCell-root": {
            color: "white",
            background: "#9A1752",
            fontWeight: "bold",
            padding: "4px 20px",
            paddingLeft: 0,
            cursor: "move",
            minWidth: "110px",
            zIndex: 2,
        }
    },
    // dragTableRow: {
    //     background: "#9A1752",
    //     "& .MuiTableCell-root": {
    //         color: "white",
    //         background: "transparent",
    //         fontWeight: "bold",
    //         padding: "4px 20px 4px 0px",
    //         borderBottomColor: "transparent",
    //         minWidth: "130px"
    //     }
    // },
    tableBody: {
        "& .MuiTableCell-root": {
            background: "white",
        }
    },
    searchBar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "6px 18px",
        marginLeft: 0,
    },
    pagination: {
        "& .MuiToolbar-root p:nth-last-child(2)": {
            marginLeft: "auto"
        },
        "& .MuiToolbar-root .MuiTablePagination-spacer": {
            display: "none"
        }
    }

}));


// mui search functions
export const Search = styled('div')(({theme}) => ({
    position: 'relative',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

export const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    position: 'absolute',
    right: 0,
    top: "8px",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: "pointer",
    margin: "0px 5px"
}));

export const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 0, 1, 1),
        // vertical padding + font size from searchIcon
        paddingRight: `calc(1em + ${theme.spacing(4)})`,
        width: '100%',
        border: "1px solid gray",
        borderRadius: "10px"
    },
}));

