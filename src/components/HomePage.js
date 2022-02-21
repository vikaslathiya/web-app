import React, { Fragment, useState } from 'react';

import { useDispatch } from 'react-redux';
import { loginAction } from './store/loginReducer';

import logo from "../img/Capture.JPG"
import classes from "./HomePage.module.css";
import AppPages from './pages/AppPages';
import DeshboardPage from './pages/DashboardPage';


import {
    AppBar, Box, Button, Toolbar, Typography, CssBaseline, ListItem,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled } from '@mui/material/styles';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MuiListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";


import { Link, Route, Switch } from 'react-router-dom';
import { useHistory, useRouteMatch, } from 'react-router-dom';
import { useStyles } from '../MuiStyles/styles';
import { Image } from '@mui/icons-material';
import { IconButton } from '@material-ui/core';
import Grid from '@mui/material/Grid';


const HomePage = (props) => {
    const [open, setOpen] = useState(false);
    const [toggleMenu, setToggleMenu] = useState(false);
    const [title, setTitle] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const dispatch = useDispatch();
    const history = useHistory();
    const { path, url } = useRouteMatch();

    const jwtToken = localStorage.getItem("authToken");

    // logut user
    const logoutHandlar = async () => {
        await fetch("https://d.jeweltrace.in/login/clearsession", {
            method: "POST",
            body: JSON.stringify({
                "username": "b1manager",
                "password": "admin",
                "type": "web"
            }),
            headers: {
                "Content-Type": "application/json",
                "x-web-token": jwtToken,
            },
        })
        dispatch(loginAction.logout());

        history.push("/auth");
    }

    // toggle logout button
    const toggleMenuHandlar = (e) => {
        e.preventDefault();
        setToggleMenu(!toggleMenu);
    }

    // change title name
    const titleChangeHandlar = (name) => {
        setTitle(name);
    }

    // mui drawer functions
    const drawerWidth = 253;

    const openedMixin = (theme) => ({
        width: drawerWidth,
        marginTop: "69px",
        marginLeft: "10px",
        backgroundColor: "#9a1752",

        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    });

    const closedMixin = (theme) => ({
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

    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            width: drawerWidth,
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

    const handleDrawerClose = () => {
        setOpen(!open);
    };

    // extra styles in drawer
    const myStyle = useStyles();

    const ListItem = withStyles({
        root: {
            "&$selected": {
                backgroundColor: "#f8d3e4",
                "& .MuiListItemIcon-root": {
                    color: "#9a1752"
                },
                "& .MuiListItemText-root span a": {
                    color: "#9a1752",
                }
            },
            "&$selected:hover": {
                backgroundColor: "#f8d3e4",
                "& .MuiListItemIcon-root": {
                    color: "#9a1752"
                },
                "& .MuiListItemText-root span a": {
                    color: "#9a1752",
                }
            },
            "&:hover": {
                backgroundColor: "#f8d3e4",
                "& .MuiListItemIcon-root": {
                    color: "#9a1752"
                },
                "& .MuiListItemText-root span a": {
                    color: "#9a1752",
                }
            },
            "&": {
                "& .MuiListItemIcon-root": {
                    color: "white",
                    padding: "0 9px"
                },
                "& .MuiListItemText-root span a": {
                    color: "white",
                    textDecoration: "none"
                }
            }
        },
        selected: {}
    })(MuiListItem);

    const handleListItemClick = (event, index) => {
        // event.preventDefault();
        setSelectedIndex(index);
    };

    const toggleManu = !toggleMenu ? classes["hide-menu"] : classes.dropdown;
    let userData = JSON.parse(localStorage.getItem("user"));

    return (
        <Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container>
                    <Grid item xs={12}>
                        <AppBar position="static" className={classes.appbar} style={{}}>
                            <Toolbar className={classes.toolbar} style={{ paddingLeft: "0px" }} >
                                <img src={logo} alt="logo" />
                                <Typography variant="h6" component="div" className={classes.typography}
                                    style={{ fontWeight: "bold", marginLeft: "20px" }}
                                >
                                    {title ? title : "Dashboard"}
                                </Typography>
                                <p className={classes.userFullName} >{userData.data.firstname} {userData.data.lastname}</p>
                                <KeyboardArrowDownIcon onClick={toggleMenuHandlar} className={myStyle.arrowIcon} />
                            </Toolbar>
                        </AppBar>
                    </Grid>
                </Grid>
            </Box>


            {toggleManu && <div className={toggleManu}>
                <Button onClick={logoutHandlar} variant="contained"
                    sx={{
                        backgroundColor: "white",
                        color: "black",
                        zIndex: 3,
                        "&:hover": {
                            backgroundColor: "gray",
                            color: "white",
                        }
                    }}>
                    Logout
                </Button>
            </div>
            }

            <div className={classes.drawer} >
                <Box sx={{ display: 'flex' }} >
                    <CssBaseline />
                    <Drawer variant="permanent" open={open} className={myStyle.root}>
                        <List component="nav">
                            <ListItem button selected={selectedIndex === 0}>
                                <ListItemIcon onClick={handleDrawerClose}><DashboardIcon /></ListItemIcon>
                                <ListItemText >
                                    <Link to={`${url}/dashboard`}
                                        onClick={(event) => handleListItemClick(event, 0)}>
                                        Dashboard</Link>
                                </ListItemText>
                            </ListItem>

                            <ListItem button selected={selectedIndex === 1}>
                                <ListItemIcon onClick={handleDrawerClose}> <ListAltIcon />  </ListItemIcon>
                                <ListItemText ><Link
                                    onClick={(event) => handleListItemClick(event, 1)}
                                    to={`${url}/inventory`}>
                                    Inventory</Link>
                                </ListItemText>
                            </ListItem>

                            <ListItem button selected={selectedIndex === 2}                            >
                                <ListItemIcon onClick={handleDrawerClose}> <MenuBookIcon /></ListItemIcon>
                                <ListItemText > <Link
                                    onClick={(event) => handleListItemClick(event, 2)}
                                    to={`${url}/transactions`}>
                                    Transactions</Link>
                                </ListItemText>
                            </ListItem>

                            <ListItem button selected={selectedIndex === 3}>
                                <ListItemIcon onClick={handleDrawerClose}> <PeopleIcon /> </ListItemIcon>
                                <ListItemText ><Link
                                    onClick={(event) => handleListItemClick(event, 3)}
                                    to={`${url}/customers`}>
                                    Customers</Link>
                                </ListItemText>
                            </ListItem>

                            <ListItem button selected={selectedIndex === 4}>
                                <ListItemIcon onClick={handleDrawerClose}><AutoGraphIcon /></ListItemIcon>
                                <ListItemText > <Link
                                    onClick={(event) => handleListItemClick(event, 4)}
                                    to={`${url}/reports`}>
                                    Reports</Link>
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Drawer>

                    <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
                        <Switch>
                            <Route exact path={`${path}`}><DeshboardPage /></Route>
                            <Route path={`${path}/:name`}><AppPages titleName={titleChangeHandlar} /></Route>
                        </Switch>
                    </Box>
                </Box>
            </div>

        </Fragment >
    )
}

export default HomePage;