import {makeStyles} from "@material-ui/core/styles";
import {styled} from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

// customer page mui styles
export const useStyles = makeStyles(() => ({
    mainBox: {
        padding: "35px 10px",
        paddingTop: "12px",
        background: "white",
        borderRadius: "10px",
    },
    icons: {
        "& .MuiSvgIcon-root": {
            fontSize: "18px",
            margin: "0px 4px",
            cursor: "pointer",
            color: "black",
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
    },
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

