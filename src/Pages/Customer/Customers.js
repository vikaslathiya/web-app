import React, {Fragment, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useRouteMatch} from 'react-router-dom';

import Paper from '@mui/material/Paper';
import {Box} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {Button} from '@material-ui/core';
import CloseIcon from "@mui/icons-material/Close";

import {Search, SearchIconWrapper, StyledInputBase, useStyles} from '../../Assets/Styles/CustomerStyles';
import {columnsArray, FetchAllCustomers} from "../../Middleware/CustomerApiCall";
import Tables from "../../components/Tables";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import {userDataAction} from "../../store/Reducers/userDataReducer";

const Customers = () => {
    const totalCustomer = useSelector(state => state.getCustomers.userData);
    const rows = useSelector(state => state.getCustomers.users);
    const isLoading = useSelector(state => state.getCustomers.isLoading);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const match = useRouteMatch();
    const history = useHistory();
    const dispatch = useDispatch();
    const totalPages = totalCustomer.totalRecord ? totalCustomer.totalRecord : totalCustomer.totalCustomer;
    const columns = columnsArray;

    useEffect(() => {
        dispatch(FetchAllCustomers(page, rowsPerPage, search))
    }, [search, page, rowsPerPage]);

// change pages
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

// set rows per page
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const searchChangeHandler = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        setSearch(e.target.value);
    };

    const addCustomerHandler = () => {
        history.push(`${match.url}/add-customer`)
    };

    const editCustomerHandler = (row) => {
        console.log(row.target)
        // dispatch(userDataAction.editCustomer({edit: row}));
        // history.push(`${match.url}/add-customer`)
    }

// mui styles
    const myStyle = useStyles();


    return (
        <Fragment>
            <Box className={myStyle.mainBox}>
                <Box className={myStyle.searchBar}>
                    <Search>
                        <StyledInputBase
                            value={search}
                            placeholder="Search here…"
                            onChange={searchChangeHandler}
                            inputProps={{'aria-label': 'search'}}/>
                        <SearchIconWrapper>
                            {search !== "" && <CloseIcon onClick={() => setSearch("")}/>}
                            <SearchIcon/>
                        </SearchIconWrapper>
                    </Search>
                </Box>
                <Box className={myStyle.tableTop}>
                    <h4>Total Customers: {totalPages}</h4>

                    <Button variant="contained" onClick={addCustomerHandler}>
                        Add Customers
                    </Button>
                </Box>

                <Paper sx={{width: '99.5%'}}>
                    <Tables
                        column={columns}
                        rows={rows}
                        isLoading={isLoading}
                        page={page}
                        pageCounts={totalPages}
                        rowsPerPage={rowsPerPage}
                        changePage={handleChangePage}
                        chageRowsPerPage={handleChangeRowsPerPage}
                        bodyIcons={[
                            {id: "visible", icon: <VisibilityIcon/>},
                            {id: "edit", icon: <EditIcon onClick={(row) => editCustomerHandler(row)}/>},
                            {id: "delete", icon: <DeleteIcon/>},
                        ]}
                    />
                </Paper>
            </Box>
        </Fragment>
    );
}

export default Customers;