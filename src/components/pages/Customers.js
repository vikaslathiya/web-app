import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch} from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { Search, SearchIconWrapper, StyledInputBase, useStyles } from '../../MuiStyles/CustomerStyles';

const Customers = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const match = useRouteMatch();
    const history = useHistory();

    // get customers data from store
    let userData = useSelector(state => state.getCustomers.users)

    // change pages 
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // set rows per page 
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const searchChangeHandlar = (e) => {
        e.preventDefault();
        const searchCustomer = userData.filter(user => {
            const data =  user.tel.includes(e.target.value)
                || user.name.toLowerCase().includes(e.target.value.toLowerCase())
                || user.email.includes(e.target.value);
        return data;
        });
        setSearch(searchCustomer);

    };
    let customer = search !== "" ? search : userData;
    const NoCustomer = customer.length === 0;

    const addCustomerHandlar = () => {
            history.push(`${match.url}/add-customer`)
    };

    // create columns for table
    const columns = [
        { id: 'name', label: 'NAME', align: 'center', minWidth: 140 },
        { id: 'tel', label: 'TEL', align: 'center', minWidth: 100 },
        { id: 'email', label: 'EMAIL', minWidth: 150, align: 'center' },
        { id: 'company', label: 'COMPANY', minWidth: 100, align: 'center' },
        { id: 'totalPur', label: 'TOTAL NO. PURCHASES', minWidth: 125, align: 'center' },
        { id: 'totalValue', label: 'TOTAL PURCHASES VALUE', minWidth: 172, align: 'center' },
        { id: 'action', label: 'ACTION', minWidth: 120, align: 'center' },
    ];

    // mui styles
    const myStyle = useStyles();

    return (
        <Fragment>
            <Box>
                <Search>
                    <StyledInputBase placeholder="Search here…"
                       onChange={searchChangeHandlar}
                        inputProps={{ 'aria-label': 'search' }} />
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                </Search>

                <Box className={myStyle.tableTop}>
                    <h4>Total Customers: {userData.length}</h4>

                    <Button variant="contained"  onClick={addCustomerHandlar}>
                        Add Customers
                    </Button>

                </Box>

            </Box>
            <Paper sx={{ width: '99.5%' }}>
                <TableContainer sx={{ maxHeight: 420 }}>
                    <Table stickyHeader aria-label="sticky table" sx={{ overflowX: 'hidden' }}>
                        <TableHead >
                            <TableRow>
                                {columns.map((column) => (<TableCell
                                    key={column.id}
                                    align={column.align}
                                    sx={{
                                        minWidth: column.minWidth,
                                        color: "white",
                                        backgroundColor: "#9A1752",
                                        fontWeight: "bold",
                                        padding: "10px",
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!NoCustomer && customer.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {value}
                                                    {column.id === "action" && <div className={myStyle.icons}>
                                                        <VisibilityIcon />
                                                        <EditIcon />
                                                        <DeleteIcon />
                                                    </div>}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    {NoCustomer && <h4 style={{textAlign: "center"}} >No Customer Found!</h4>}
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
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