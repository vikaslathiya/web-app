import React, {Fragment} from "react";
import Grid from "@mui/material/Grid";
import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import logo from "../../Assets/Images/Capture.JPG";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {useStyles} from "../../Assets/Styles/HomepageStyles";

const NavAppbar = (props) => {
    const {drawerClose, title, toggleMenu, toggleMenuHandler} = props;

    // mui extra styles
    const myStyle = useStyles();

    let userData = JSON.parse(localStorage.getItem("user"));

    return (
        <Fragment>
            <Grid container>
                <Grid item xs={12}>
                    <AppBar position="fixed" style={{width: "-webkit-fill-available"}} className={myStyle.appbar}>
                        <Toolbar>
                            <img src={logo} alt="logo" onClick={drawerClose}/>
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
        </Fragment>
    );
};

export default NavAppbar;