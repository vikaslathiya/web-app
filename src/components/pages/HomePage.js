import React, { Fragment, useState } from 'react';

import { useDispatch } from 'react-redux';
import { loginAction } from '../store/loginReducer';

import logo from "../../img/Capture.JPG";
import AppPages from './AppPages';
import DeshboardPage from './DashboardPage';

import {
    AppBar, Box, Button, Toolbar, Typography, CssBaseline,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Grid from '@mui/material/Grid';

import { Link, Route, Switch } from 'react-router-dom';
import { useHistory, useRouteMatch, } from 'react-router-dom';

import { useStyles, Drawer, ListItem } from '../../MuiStyles/HomepageStyles';

const HomePage = () => {
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

    //  toggle drawer state
    const handleDrawerClose = () => {
        setOpen(!open);
    };

    // mui extra styles 
    const myStyle = useStyles();

    // set drawer link to selected
    const handleListItemClick = (event, index) => {
        // event.preventDefault();
        setSelectedIndex(index);
    };

    // toggle drop-menu
    const toggleManu = !toggleMenu ? myStyle.hideMenu : myStyle.dropdown;

    let userData = JSON.parse(localStorage.getItem("user"));

    return (
        <Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container>
                    <Grid item xs={12}>
                        <AppBar position="static" sx={{width: "auto"}} className={myStyle.appbar}>
                            <Toolbar>
                                <img src={logo} alt="logo" onClick={handleDrawerClose} />
                                <Typography variant="h6" component="div" >
                                    {title ? title : "Dashboard"}
                                </Typography>
                                <p>{userData.data.firstname} {userData.data.lastname}</p>
                                <KeyboardArrowDownIcon onClick={toggleMenuHandlar} />
                            </Toolbar>
                        </AppBar>
                    </Grid>
                </Grid>
            </Box>


            {toggleManu && <div className={toggleManu}>
                <Button variant="contained" color='primary'>
                    Profile
                </Button>
                <Button onClick={logoutHandlar} variant="contained">
                    Logout
                </Button>
            </div>}

            <div>
                <Box sx={{ display: 'flex' }} >
                    <CssBaseline />
                    <Drawer variant="permanent" open={open} className={myStyle.root}>
                        <List component="nav" className={myStyle.list}>
                            <Link to={`${url}/dashboard`}
                                onClick={(event) => handleListItemClick(event, 0)}>
                                <ListItem button selected={selectedIndex === 0}>
                                    <ListItemIcon onClick={handleDrawerClose}><DashboardIcon /></ListItemIcon>
                                    <ListItemText >Dashboard</ListItemText>
                                </ListItem>
                            </Link>

                            <Link onClick={(event) => handleListItemClick(event, 1)}
                                to={`${url}/inventory`}>
                                <ListItem button selected={selectedIndex === 1}>
                                    <ListItemIcon onClick={handleDrawerClose}> <ListAltIcon />  </ListItemIcon>
                                    <ListItemText >Inventory </ListItemText>
                                </ListItem>
                            </Link>

                            <Link onClick={(event) => handleListItemClick(event, 2)}
                                to={`${url}/transactions`}>
                                <ListItem button selected={selectedIndex === 2} >
                                    <ListItemIcon onClick={handleDrawerClose}> <MenuBookIcon /></ListItemIcon>
                                    <ListItemText > Transactions</ListItemText>
                                </ListItem>
                            </Link>

                            <Link onClick={(event) => handleListItemClick(event, 3)}
                                to={`${url}/customers`}>
                                <ListItem button selected={selectedIndex === 3}>
                                    <ListItemIcon onClick={handleDrawerClose}> <PeopleIcon /> </ListItemIcon>
                                    <ListItemText >Customers</ListItemText>
                                </ListItem>
                            </Link>

                            <Link onClick={(event) => handleListItemClick(event, 4)}
                                to={`${url}/reports`}>
                                <ListItem button selected={selectedIndex === 4}>
                                    <ListItemIcon onClick={handleDrawerClose}><AutoGraphIcon /></ListItemIcon>
                                    <ListItemText > Reports </ListItemText>
                                </ListItem>
                            </Link>
                        </List>
                    </Drawer>

                    <Box component="main" sx={{ flexGrow: 1, p: 1, overflowX: "auto" }}>
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