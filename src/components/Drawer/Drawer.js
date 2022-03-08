import React, {Fragment} from "react";
import List from "@material-ui/core/List";
import {Link} from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListItemText from "@material-ui/core/ListItemText";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import {useStyles, Drawer, ListItem} from '../../Assets/Styles/HomepageStyles';

const HomepageDrawer = (props) => {
    const {url, open, listItemClick, selectedIndex, drawerClose} = props;

    // mui extra styles
    const myStyle = useStyles();

    return (
        <Fragment>
            <Drawer variant="permanent" open={open} className={myStyle.root}>
                <List component="nav" className={myStyle.list}>
                    <Link to={`${url}/dashboard`}
                          onClick={(event) => listItemClick(event, 0)}>
                        <ListItem button selected={selectedIndex === 0}>
                            <ListItemIcon onClick={drawerClose}><DashboardIcon/></ListItemIcon>
                            <ListItemText>Dashboard</ListItemText>
                        </ListItem>
                    </Link>

                    <Link onClick={(event) => listItemClick(event, 1)}
                          to={`${url}/inventory`}>
                        <ListItem button selected={selectedIndex === 1}>
                            <ListItemIcon onClick={drawerClose}> <ListAltIcon/> </ListItemIcon>
                            <ListItemText>Inventory </ListItemText>
                        </ListItem>
                    </Link>

                    <Link onClick={(event) => listItemClick(event, 2)}
                          to={`${url}/transactions`}>
                        <ListItem button selected={selectedIndex === 2}>
                            <ListItemIcon onClick={drawerClose}> <MenuBookIcon/></ListItemIcon>
                            <ListItemText> Transactions</ListItemText>
                        </ListItem>
                    </Link>

                    <Link onClick={(event) => listItemClick(event, 3)}
                          to={`${url}/customers`}>
                        <ListItem button selected={selectedIndex === 3}>
                            <ListItemIcon onClick={drawerClose}> <PeopleIcon/> </ListItemIcon>
                            <ListItemText>Customers</ListItemText>
                        </ListItem>
                    </Link>

                    <Link onClick={(event) => listItemClick(event, 4)}
                          to={`${url}/reports`}>
                        <ListItem button selected={selectedIndex === 4}>
                            <ListItemIcon onClick={drawerClose}><AutoGraphIcon/></ListItemIcon>
                            <ListItemText> Reports </ListItemText>
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
        </Fragment>
    );
};

export default HomepageDrawer;