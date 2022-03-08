import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Search, SearchIconWrapper, StyledInputBase} from "../Customer/CustomerStyles";
import {useStyles} from "./InventoryStyle";
import {columnsArray, getInventory} from "./GetInventory";
import InventoryTable from "./InventoryTable";

import SearchIcon from "@mui/icons-material/Search";
import {Box, Paper} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const Inventory = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sorting, setSorting] = useState("");
    const [search, setSearch] = useState("");
    const user = useSelector(state => state.getInventory.user)
    const [columns, setColumns] = useState(columnsArray);

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

    const onDragEndHandler = (result) => {
        const {destination, source} = result;

        // Not a thing to do...
        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
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
        dispatch(getInventory(page, rowsPerPage, sorting, search));
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
                    <InventoryTable
                        onDragEnd={onDragEndHandler}
                        columns={columns}
                        sorting={sortingHandler}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        changePage={handleChangePage}
                        changeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </Fragment>
    );
}

export default Inventory;