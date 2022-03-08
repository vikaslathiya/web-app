import React, {Fragment, useCallback, useState} from 'react';

import {useDispatch} from 'react-redux';
import {loginAction} from '../../store/Reducers/loginReducer';

import AppPages from './AppPages';
import DashboardPage from '../Dashboard/DashboardPage';

import {Box, CssBaseline, ListItemButton} from '@mui/material';
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Paper from "@mui/material/Paper";

import {Route, Switch, useLocation} from 'react-router-dom';
import {useHistory, useRouteMatch} from 'react-router-dom';

import HomepageDrawer from "../../components/Drawer/Drawer";
import {useStyles} from '../../Assets/Styles/HomepageStyles';
import {logoutApp} from "../../Middleware/HomepageData";
import NavAppbar from "../../Layouts/Header/NavAppbar";

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
        history.replace("/auth");
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
        localStorage.setItem("selectedIndex", index)
        setSelectedIndex(index);
    };

    // toggle drop-menu
    const toggleDropDown = !toggleMenu ? myStyle.hideMenu : myStyle.dropdown;

    return (
        <Fragment>
            <Box sx={{flexGrow: 1}}>
                <NavAppbar
                    drawerClose={handleDrawerClose}
                    title={title}
                    toggleMenu={toggleMenu}
                    toggleMenuHandler={toggleMenuHandler}
                />
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

            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <HomepageDrawer
                    open={open}
                    url={url}
                    listItemClick={handleListItemClick}
                    drawerClose={handleDrawerClose}
                    selectedIndex={selectedIndex}
                />

                <Box component="main"
                     sx={{flexGrow: 1, p: 1, mt: "75px", overflowX: "auto"}}>

                    <Switch>
                        <Route exact path={`${path}`}><DashboardPage/></Route>
                        <Route path={`${path}/:name`}><AppPages titleName={titleChangeHandler}/></Route>
                    </Switch>

                </Box>
            </Box>
        </Fragment>
    )
}

export default HomePage;