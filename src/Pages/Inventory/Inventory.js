import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Search, SearchIconWrapper, StyledInputBase} from "../../Assets/Styles/CustomerStyles";
import {useStyles} from "../../Assets/Styles/InventoryStyle";
import {columnsArray, getInventory} from "../../Middleware/GetInventory";

import SearchIcon from "@mui/icons-material/Search";
import {Box, Paper} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Tables from "../../components/Tables";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PictureAsPdfSharpIcon from "@mui/icons-material/PictureAsPdfSharp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Inventory = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sorting, setSorting] = useState("");
    const [search, setSearch] = useState("");
    const user = useSelector(state => state.getInventory.user)
    const rows = useSelector(state => state.getInventory.userData)
    const isLoading = useSelector(state => state.getInventory.isLoading)
    const columns = columnsArray;

    // mui styles
    const myStyle = useStyles();

    useEffect(() => {
        dispatch(getInventory(page, rowsPerPage, sorting, search));
    }, [dispatch, page, rowsPerPage, sorting, search]);

    const totals = {
        totalsku: user.totalSku,
        totalPcs: user.totalPcs
    }
    if (search === "") {
        localStorage.setItem("totals", JSON.stringify(totals))
    }

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

    const sortingHandler = (column) => {
        setSorting(column);
    }

    let totalItems = JSON.parse(localStorage.getItem("totals"))

    return (
        <Fragment>
            <Box className={myStyle.mainBox}>
                <Box className={myStyle.searchBar}>
                    <Search>
                        <StyledInputBase placeholder="Search here…"
                                         value={search}
                                         onChange={searchChangeHandler}
                                         inputProps={{'aria-label': 'search'}}/>
                        <SearchIconWrapper>
                            {search !== "" && <CloseIcon onClick={() => setSearch("")}/>}
                            <SearchIcon/>
                        </SearchIconWrapper>
                    </Search>
                </Box>
                <Box className={myStyle.searchBar}>
                    <h4>Total Stones: {totalItems.totalsku} {search !== "" && <span>({user.totalSku})</span>}</h4>
                    <h4>Total Carats: {totalItems.totalPcs} {search !== "" && <span>({user.totalPcs})</span>}</h4>
                </Box>
                <Paper sx={{width: '100%'}}>
                    <Tables
                        column={columns}
                        rows={rows}
                        isLoading={isLoading}
                        sorting={sortingHandler}
                        page={page}
                        pageCounts={user.totalPage === undefined ? 0 : user.totalPage}
                        rowsPerPage={rowsPerPage}
                        changePage={handleChangePage}
                        changeRowsPerPage={handleChangeRowsPerPage}
                        bodyIcons={[
                            {id: "visible", icon: <VisibilityIcon/>},
                            {id: "pdf", icon: <PictureAsPdfSharpIcon/>}
                        ]}
                        headerIcons={<ArrowDropDownIcon style={{margin: "-6px 2px"}}/>}
                    />
                </Paper>
            </Box>
        </Fragment>
    );
}

export default Inventory;