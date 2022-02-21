import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux';

import { makeStyles } from "@material-ui/core/styles";
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
import { Search } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Toolbar } from '@material-ui/core';

const Customers = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // get customers data from store
    const customer = useSelector(state => state.getCustomers.users)
    console.log(customer)

    // change pages 
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // set rows per page 
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // icons styles
    const useStyles = makeStyles((theme) => ({
        icons: {
            "& .MuiSvgIcon-root": {
                fontSize: "18px",
                margin: "0px 4px",
                cursor: "pointer",
            },
        },
    }));
    const myStyle = useStyles();

    // create colums for table
    const columns = [
        { id: 'name', label: 'NAME', align: 'center', minWidth: 140 },
        { id: 'tel', label: 'TEL', align: 'center', minWidth: 100 },
        { id: 'email', label: 'EMAIL', minWidth: 150, align: 'center' },
        { id: 'company', label: 'COMPANY', minWidth: 100, align: 'center' },
        { id: 'totalPur', label: 'TOTAL NO. PURCHASES', minWidth: 125, align: 'center' },
        { id: 'totalValue', label: 'TOTAL PURCHASES VALUE', minWidth: 172, align: 'center' },
        { id: 'action', label: 'ACTION', minWidth: 120, align: 'center' },
    ];

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));


    return (
        <Fragment>
            <Paper sx={{ width: '99.5%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 420 }}>
                    <Box>
                        <Toolbar>
                            <Search
                                style={{ width: "210px" }}
                            >
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                    sx={{ border: "1px solid gray", borderRadius: "10px" }}
                                />
                            </Search>
                            <Box sx={{ m: "auto" }}>
                                <h4>Total Customers: {customer.length}</h4>
                            </Box>
                            <Button sx={{ backgroundColor: "#9A1752", "&:hover": { backgroundColor: "#f8d3e4", color: "#9A1752" } }} variant="contained">
                                Add Customers
                            </Button>
                        </Toolbar>
                    </Box>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead >
                            <TableRow>
                                {columns.map((column) => (<TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        minWidth: column.minWidth,
                                        backgroundColor: "#76b9f0",
                                        fontWeight: "bold",
                                        padding: "5px",
                                    }}>
                                    {column.label}
                                </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customer.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
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