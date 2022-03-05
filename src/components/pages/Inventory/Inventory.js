import React, {Fragment, useEffect, useState} from 'react'
import {Box} from "@mui/material";
import {Search, SearchIconWrapper, StyledInputBase} from "../Customer/CustomerStyles";
import {useStyles} from "./InventoryStyle";
import SearchIcon from "@mui/icons-material/Search";
import {TablePagination} from "@material-ui/core";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PictureAsPdfSharpIcon from '@mui/icons-material/PictureAsPdfSharp';
import {getInventory} from "./GetInventory";
import {useDispatch, useSelector} from "react-redux";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


const Inventory = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sorting, setSorting] = useState("");
    const [search, setSearch] = useState("");
    const user = useSelector(state => state.getInventory.user)
    const userData = useSelector(state => state.getInventory.userData)

    // mui styles
    const myStyle = useStyles();

    // create columns for table
    const columns = [
        {id: 'sku_number', label: 'SKU', align: 'center', minWidth: 75},
        {id: 'design_code', label: 'Design Code', align: 'center', minWidth: 137},
        {id: 'metal_type', label: 'Material', minWidth: 104, align: 'center'},
        {id: 'design_category', label: 'Design Category', minWidth: 162, align: 'center'},
        {id: 'diamond_weight', label: 'Diamond Ct.', minWidth: 134, align: 'center'},
        {id: 'net_weight', label: 'Net Weight', minWidth: 124, align: 'center'},
        {id: 'sales_value', label: 'Price', minWidth: 84, align: 'center'},
        {id: 'sku_quantity', label: 'SKU Qty', minWidth: 106, align: 'center'},
        {id: 'createdAt', label: 'Date', minWidth: 106, align: 'center'},
        {id: 'action', label: 'Action', minWidth: 100, align: 'center'},
    ];

    useEffect(() => {
        dispatch(getInventory(page, rowsPerPage, sorting, search));
    }, [dispatch, page, rowsPerPage, sorting, search]);

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
        setSearch(e.target.value.toUpperCase());
    };

    const NoData = userData.length === 0;

    const sortingHandler = (column) => {
        setSorting(column);
    }

    const style = {
        right: 0,
        position: "sticky",
        minWidth: "100px"
    }

    return (
        <Fragment>
            <Box className={myStyle.searchBar}>
                <Search>
                    <StyledInputBase placeholder="Search here…"
                                     onChange={searchChangeHandler}
                                     inputProps={{'aria-label': 'search'}}/>
                    <SearchIconWrapper>
                        <SearchIcon/>
                    </SearchIconWrapper>
                </Search>
                <h4>Total Stones: {user.totalSku}</h4>
                <h4>Total Carats: {user.totalPcs}</h4>
            </Box>
            <Paper sx={{width: '100%'}}>
                <TableContainer sx={{maxHeight: "383px"}} className={myStyle.tables}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow className={myStyle.tableCell}>
                                {columns.map((column) => (
                                    column.id === "action" ?
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            onClick={() => sortingHandler(column.id)}
                                            sx={style}
                                        >
                                            {column.label}
                                        </TableCell> :
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            onClick={() => sortingHandler(column.id)}
                                            sx={{minWidth: column.minWidth}}
                                        >
                                            {column.label}
                                            <ArrowDropDownIcon style={{margin: "-6px 2px"}}/>
                                        </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!NoData && userData.map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id} className={myStyle.tableRow}>
                                        {columns.map((column) => {
                                            let value;
                                            if (column.id === "sales_value") {
                                                value = `₹ ${row[column.id]}`;
                                            } else if (column.id === "createdAt") {
                                                value = row[column.id].slice(0, 10);
                                            } else {
                                                value = row[column.id];
                                            }
                                            return (
                                                column.id === "action" ?
                                                    <TableCell key={column.id} align={column.align}
                                                               sx={style}
                                                    >
                                                        <div className={myStyle.icons}>
                                                            <VisibilityIcon/>
                                                            <PictureAsPdfSharpIcon/>
                                                        </div>
                                                    </TableCell> :
                                                    <TableCell key={column.id} align={column.align}
                                                    >
                                                        {value}
                                                    </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    {NoData && <h4 style={{textAlign: "center"}}>No Inventory Found!</h4>}
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={user.totalPage === undefined ? 0 : user.totalPage}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Fragment>
    );
}

export default Inventory;