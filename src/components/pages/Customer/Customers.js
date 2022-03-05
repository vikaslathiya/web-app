import React, {Fragment, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useRouteMatch} from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import {Box} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {Button, TablePagination} from '@material-ui/core';

import {Search, SearchIconWrapper, StyledInputBase, useStyles} from './CustomerStyles';
import {userDataAction} from "../../store/userDataReducer";
import {FetchAllCustomers} from "./EditData";

const Customers = () => {
    const customer = useSelector(state => state.getCustomers.users)
    const totalCustomer = useSelector(state => state.getCustomers.userData)
    const [rowsPerPage, setRowsPerPage] = useState(10);
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

    const NoCustomer = customer.length === 0;

    const addCustomerHandler = () => {
        history.push(`${match.url}/add-customer`)
    };

    const editCustomerHandler = (row) => {
        dispatch(userDataAction.editCustomer({edit: row}));
        history.push(`${match.url}/add-customer`)
    }

// create columns for table
    const columns = [{id: 'firstName', label: 'NAME', align: 'center', minWidth: 140}, {
        id: 'contactNumber',
        label: 'TEL',
        align: 'center',
        minWidth: 100
    }, {id: 'email', label: 'EMAIL', minWidth: 150, align: 'center'}, {
        id: 'companyName',
        label: 'COMPANY',
        minWidth: 100,
        align: 'center'
    }, {id: 'itemTotal', label: 'TOTAL NO. PURCHASES', minWidth: 125, align: 'center'}, {
        id: 'priceTotal',
        label: 'TOTAL PURCHASES VALUE',
        minWidth: 172,
        align: 'center'
    }, {id: 'action', label: 'ACTION', minWidth: 120, align: 'center'},];

// mui styles
    const myStyle = useStyles();
    const tableCellStyle = {
        position: "sticky",
        right: 0,
        minWidth: 120,
    }

    const enterHandler = () => {
        console.log("entered")
    }

    return (
        <Fragment>
            <Box>
                <Search>
                    <StyledInputBase placeholder="Search here…"
                                     onChange={searchChangeHandler}
                                     inputProps={{'aria-label': 'search'}}/>
                    <SearchIconWrapper>
                        <SearchIcon/>
                    </SearchIconWrapper>
                </Search>

                <Box className={myStyle.tableTop}>
                    <h4>Total
                        Customers: {totalCustomer.totalRecord ? totalCustomer.totalRecord : totalCustomer.totalCustomer}</h4>

                    <Button variant="contained" onClick={addCustomerHandler}>
                        Add Customers
                    </Button>
                </Box>

            </Box>
            <Paper sx={{width: '99.5%'}}>
                <TableContainer className={myStyle.tables}>
                    <Table stickyHeader aria-label="sticky table" sx={{}}>
                        <TableHead>
                            <TableRow className={myStyle.tableRow}>
                                {columns.map((column) => (
                                    column.id === "action" ?
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            sx={tableCellStyle}
                                        >
                                            {column.label}
                                        </TableCell> :
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            sx={{minWidth: column.minWidth}}
                                            onMouseDown={enterHandler}
                                        >
                                            {column.label}
                                        </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!NoCustomer && customer.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (<TableRow hover role="checkbox" tabIndex={-1} key={row._id}
                                                      className={myStyle.tableBody}>
                                        {columns.map((column) => {

                                            const value = column.id === "firstName" ? `${row[column.id]} ${row["familyName"]}` : row[column.id];

                                            return (
                                                column.id === "action" ?
                                                    <TableCell key={column.id} align={column.align} sx={tableCellStyle}>
                                                        <div className={myStyle.icons}>
                                                            <VisibilityIcon/>
                                                            <EditIcon onClick={() => editCustomerHandler(row)}/>
                                                            <DeleteIcon/>
                                                        </div>
                                                    </TableCell> :
                                                    <TableCell key={column.id} align={column.align}>
                                                        {value}
                                                    </TableCell>
                                            );
                                        })}
                                    </TableRow>);
                                })}
                        </TableBody>
                    </Table>
                    {NoCustomer && <h4 style={{textAlign: "center"}}>No Customer Found!</h4>}
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={customer.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Fragment>
    );
}

export default Customers;