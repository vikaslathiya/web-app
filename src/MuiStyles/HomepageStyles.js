import { styled } from '@mui/material/styles';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MuiListItem from "@material-ui/core/ListItem";
import MuiDrawer from '@mui/material/Drawer';

// home page style
export const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper
    },
    appbar: {
        "&": {
            margin: "5px 10px",
        },
        "& .MuiToolbar-root": {
            backgroundColor: "white",
            color: "#9a1752",
            paddingLeft: "0px"
        },
        "& .MuiToolbar-root img": {
            width: "253px",
            cursor: "pointer",
        },
        "& .MuiToolbar-root .MuiTypography-root": {
            flexGrow: 1,
            fontWeight: "bold",
            marginLeft: "20px"
        },
        "& .MuiToolbar-root p": {
            fontSize: "15px",
            marginRight: "2px",
            color: "black"
        },
        "& .MuiToolbar-root .MuiSvgIcon-root": {
            color: "black",
            cursor: "pointer",
        },
        "& .MuiToolbar-root .MuiSvgIcon-root:hover": {
            marginTop: "3px",
        },
    },
    btn: {
        "&": {
            backgroundColor: "#9A1752",
        },
    },
    list: {
        "& a": {
            textDecoration: "none",
            color: "white",
        },
        "& a:hover": {
            color: "#9A1752",
        }
    },
    dropdown: {
        "&": {
            position: "absolute",
            top: "70px",
            right: "20px",
            display: "grid",
        },
        "& button": {
            backgroundColor: "white",
            color: "black",
            zIndex: 3,
            marginBottom: "1px",
        },
        "& button:hover": {
            backgroundColor: "#e9e9e9",
            color: "black",
        },
    },
    hideMenu: {
        "&": {
            display: "none",
        },
    }
}));

// home page mui drawer functions
export const openedMixin = (theme) => ({
    width: "253px",
    marginTop: "69px",
    marginLeft: "10px",
    backgroundColor: "#9a1752",

    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

export const closedMixin = (theme) => ({
    marginTop: "69px",
    marginLeft: "10px",
    backgroundColor: "#9a1752",
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: "253px",
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export const ListItem = withStyles({
    root: {
        "&$selected": {
            backgroundColor: "#f8d3e4",
            "& .MuiListItemIcon-root": {
                color: "#9a1752"
            },
        },
        "&$selected:hover": {
            backgroundColor: "#f8d3e4",
            "& .MuiListItemIcon-root": {
                color: "#9a1752"
            },
        },
        "&:hover": {
            backgroundColor: "#f8d3e4",
            "& .MuiListItemIcon-root": {
                color: "#9a1752"
            },
        },
        "&": {
            "& .MuiListItemIcon-root": {
                color: "white",
                padding: "0 9px",
            },
        }
    },
    selected: {}
})(MuiListItem);