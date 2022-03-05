import {makeStyles} from "@material-ui/core/styles";
import {styled} from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

// customer page mui styles
export const useStyles = makeStyles(() => ({
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
            padding: "10px",
            cursor: "move",
        }
    },
    tableBody: {
        "& .MuiTableCell-root": {
            background: "white",
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
    left: "200px",
    top: "8px",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: "pointer"
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

