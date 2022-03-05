import React, {Fragment, useCallback, useState} from 'react';

import {useDispatch} from 'react-redux';
import {loginAction} from '../../store/loginReducer';

import logo from "../../../img/Capture.JPG";
import AppPages from './AppPages';
import DashboardPage from '../Dashboard/DashboardPage';

import {
    AppBar, Box, Button, Toolbar, Typography, CssBaseline, ListItemButton
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Grid from '@mui/material/Grid';

import {Link, Route, Switch, useLocation} from 'react-router-dom';
import {useHistory, useRouteMatch} from 'react-router-dom';

import {useStyles, Drawer, ListItem} from './HomepageStyles';
import {logoutApp} from "./HomepageData";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import Paper from "@mui/material/Paper";

const HomePage = () => {
    const [open, setOpen] = useState(false);
    const [toggleMenu, setToggleMenu] = useState(false);
    const [title, setTitle] = useState(null);
    const prevIndex = localStorage.getItem("selectedIndex")
    const [selectedIndex, setSelectedIndex] = useState(prevIndex ? Number(prevIndex) : 0);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const {path, url} = useRouteMatch();

    localStorage.setItem("currentPath", location.pathname);

    // logout user
    const logoutHandler = async () => {
        await logoutApp();
        dispatch(loginAction.logout());
        history.push("/auth");
    }

    // toggle logout button
    const toggleMenuHandler = useCallback((event) => {
        event.preventDefault();
        setToggleMenu(!toggleMenu);
    }, [toggleMenu]);

    // change title name
    const titleChangeHandler = (name) => {
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
        localStorage.setItem("selectedIndex", index)
        setSelectedIndex(index);
    };

    // toggle drop-menu
    const toggleDropDown = !toggleMenu ? myStyle.hideMenu : myStyle.dropdown;

    let userData = JSON.parse(localStorage.getItem("user"));

    return (
        <Fragment>
            <Box sx={{flexGrow: 1}}>
                <Grid container>
                    <Grid item xs={12}>
                        <AppBar position="fixed" style={{width: "-webkit-fill-available"}} className={myStyle.appbar}>
                            <Toolbar>
                                <img src={logo} alt="logo" onClick={handleDrawerClose}/>
                                <Typography variant="h6" component="div">
                                    {title ? title : "Dashboard"}
                                </Typography>
                                <List
                                    sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
                                    component="nav"
                                    aria-labelledby="nested-list-subheader">
                                    <Button onClick={toggleMenuHandler}>
                                        <ListItemText primary={`${userData.data.firstname} ${userData.data.lastname}`}/>
                                        {toggleMenu ? <ExpandLess/> : <ExpandMore/>}
                                    </Button>
                                </List>

                            </Toolbar>
                        </AppBar>
                    </Grid>
                </Grid>
            </Box>

            {toggleMenu && <Paper component="div" className={toggleDropDown}>
                <List component="div" disablePadding>
                    <ListItemButton sx={{pl: 4}}>
                        <ListItemText primary="Profile"/>
                    </ListItemButton>
                    <ListItemButton sx={{pl: 4}} onClick={logoutHandler}>
                        <ListItemText primary="Logout"/>
                    </ListItemButton>
                </List>
            </Paper>}

            <div>
                <Box sx={{display: 'flex'}}>
                    <CssBaseline/>
                    <Drawer variant="permanent" open={open} className={myStyle.root}>
                        <List component="nav" className={myStyle.list}>
                            <Link to={`${url}/dashboard`}
                                  onClick={(event) => handleListItemClick(event, 0)}>
                                <ListItem button selected={selectedIndex === 0}>
                                    <ListItemIcon onClick={handleDrawerClose}><DashboardIcon/></ListItemIcon>
                                    <ListItemText>Dashboard</ListItemText>
                                </ListItem>
                            </Link>

                            <Link onClick={(event) => handleListItemClick(event, 1)}
                                  to={`${url}/inventory`}>
                                <ListItem button selected={selectedIndex === 1}>
                                    <ListItemIcon onClick={handleDrawerClose}> <ListAltIcon/> </ListItemIcon>
                                    <ListItemText>Inventory </ListItemText>
                                </ListItem>
                            </Link>

                            <Link onClick={(event) => handleListItemClick(event, 2)}
                                  to={`${url}/transactions`}>
                                <ListItem button selected={selectedIndex === 2}>
                                    <ListItemIcon onClick={handleDrawerClose}> <MenuBookIcon/></ListItemIcon>
                                    <ListItemText> Transactions</ListItemText>
                                </ListItem>
                            </Link>

                            <Link onClick={(event) => handleListItemClick(event, 3)}
                                  to={`${url}/customers`}>
                                <ListItem button selected={selectedIndex === 3}>
                                    <ListItemIcon onClick={handleDrawerClose}> <PeopleIcon/> </ListItemIcon>
                                    <ListItemText>Customers</ListItemText>
                                </ListItem>
                            </Link>

                            <Link onClick={(event) => handleListItemClick(event, 4)}
                                  to={`${url}/reports`}>
                                <ListItem button selected={selectedIndex === 4}>
                                    <ListItemIcon onClick={handleDrawerClose}><AutoGraphIcon/></ListItemIcon>
                                    <ListItemText> Reports </ListItemText>
                                </ListItem>
                            </Link>
                        </List>
                    </Drawer>

                    <Box component="main"
                         sx={{flexGrow: 1, p: 1, mt: "75px", overflowX: "auto"}}>

                        <Switch>
                            <Route exact path={`${path}`}><DashboardPage/></Route>
                            <Route path={`${path}/:name`}><AppPages titleName={titleChangeHandler}/></Route>
                        </Switch>

                    </Box>
                </Box>
            </div>

        </Fragment>
    )
}

export default HomePage;