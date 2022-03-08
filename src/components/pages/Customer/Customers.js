import React, {Fragment, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useRouteMatch} from 'react-router-dom';

import Paper from '@mui/material/Paper';
import {Box} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {Button} from '@material-ui/core';
import CloseIcon from "@mui/icons-material/Close";

import {Search, SearchIconWrapper, StyledInputBase, useStyles} from './CustomerStyles';
import {userDataAction} from "../../store/userDataReducer";
import {columnsArray, FetchAllCustomers} from "./EditData";
import CustomersTable from "./CustomersTable";

const Customers = () => {
    const totalCustomer = useSelector(state => state.getCustomers.userData);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [columns, setColumns] = useState(columnsArray);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const match = useRouteMatch();
    const history = useHistory();
    const dispatch = useDispatch();

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
        dispatch(userDataAction.editCustomer({edit: row}));
        history.push(`${match.url}/add-customer`)
    }

// mui styles
    const myStyle = useStyles();

    const onDragEndHandler = (result) => {
        const {destination, source} = result;

        // Not a thing to do...
        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        let add, active = columns;
        if (source.droppableId === "droppable") {
            add = active[source.index];
            active.splice(source.index, 1);
        }

        if (destination.droppableId === "droppable") {
            active.splice(destination.index, 0, add);
        }

        setColumns(active);
        dispatch(FetchAllCustomers(page, rowsPerPage, search))
    }

    return (<Fragment>
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
                <h4>Total
                    Customers: {totalCustomer.totalRecord ? totalCustomer.totalRecord : totalCustomer.totalCustomer}</h4>

                <Button variant="contained" onClick={addCustomerHandler}>
                    Add Customers
                </Button>
            </Box>

            <Paper sx={{width: '99.5%'}}>
                <CustomersTable
                    onDragEnd={onDragEndHandler}
                    columns={columns}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    editCustomer={editCustomerHandler}
                    changePage={handleChangePage}
                    changeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    </Fragment>);
}

export default Customers;