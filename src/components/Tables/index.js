import React, {Fragment, useRef, useState} from "react";

import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {TablePagination} from "@material-ui/core";

import {TableStyles} from "../../Assets/Styles/TableStyles";
import "../../Assets/Styles/customerDnD.css";
import Notification from "../Notification";

const Tables = (props) => {
    const {
        isLoading,
        page,
        rowsPerPage,
        changePage,
        changeRowsPerPage,
        column,
        rows,
        pageCounts,
        sorting,
        bodyIcons,
        headerIcons
    } = props;
    const [prevIndex, setPrevIndex] = useState();
    const [columns, setColumns] = useState(column);
    const [showFeedback, setShowFeedback] = useState(false);
    const dragItem = useRef();
    const dragOverItem = useRef();
    const myStyle = TableStyles();
    const NoRows = rows.length === 0;

    const tableCellStyle = {
        position: "sticky",
        right: 0,
        minWidth: 120,
        color: "white",
        backgroundColor: "#9A1752 !important",
    }

    const dragStart = (e, position) => {
        dragItem.current = position;
        e.target.className += " dragEnd dragStart";
        setPrevIndex(position);

    };

    const dragEnter = (e, position) => {
        if (prevIndex > position) {
            if (e.target.className.includes("dragOverRL")) {
                e.target.classList.remove("dragOverRL")
            }
            e.target.classList.toggle("dragOverLR")
        } else {
            if (e.target.className.includes("dragOverLR")) {
                e.target.classList.toggle("dragEnd")
            } else {
                e.target.classList.toggle("dragOverRL")
            }
        }
        setPrevIndex(position);
        dragOverItem.current = position;
    };

    const drop = (e) => {
        if (dragItem.current === dragOverItem.current) {
            return e.target.className = "dragItem";
        }
        setShowFeedback(true);
        const copyListItems = [...columns];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setColumns(copyListItems)

        e.target.classList.toggle("dragEnd");

        setTimeout(() => {
            setShowFeedback(false);
        }, 1000)
    };

    return (
        <Fragment>
            <TableContainer className={myStyle.tables}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow className={myStyle.tableRow}>
                            {columns.map((column, index) => (
                                column.id === "action" ? <TableCell
                                        key={column.id}
                                        align={column.align}
                                        sx={tableCellStyle}
                                    >
                                        {column.label}
                                    </TableCell> :
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        onClick={() => sorting(column.id)}
                                        sx={{minWidth: column.minWidth}}>
                                        <div key={index}
                                             onDragStart={(e) => dragStart(e, index)}
                                             onDragEnter={(e) => dragEnter(e, index)}
                                             onDragEnd={(e) => drop(e, index)}
                                             className="dragItem"
                                             draggable>
                                            {column.label}
                                            {headerIcons}
                                        </div>
                                    </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    {!NoRows && !isLoading && <TableBody>
                        {rows.map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}
                                          className={myStyle.tableBody}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            column.id === "action" ?
                                                <TableCell key={column.id} align={column.align}
                                                           sx={{position: "sticky", right: 0,}}
                                                >
                                                    <div className={myStyle.icons}>
                                                        {bodyIcons.map(icon => {
                                                            return <div key={icon.id}>{icon.icon}</div>
                                                        })}
                                                    </div>
                                                </TableCell> :
                                                <TableCell key={column.id} align={column.align}>
                                                    {value}
                                                </TableCell>
                                        );
                                    })}
                                </TableRow>);
                        })}
                    </TableBody>}
                </Table>
                {NoRows && !isLoading && <h4 style={{textAlign: "center"}}>No Data Found!</h4>}
                {isLoading && <h4 style={{textAlign: "center"}}>Please wait...</h4>}
            </TableContainer>
            <TablePagination
                className={myStyle.pagination}
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={pageCounts}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={changePage}
                onRowsPerPageChange={changeRowsPerPage}
            />

            {showFeedback && <Notification text="Update Successfully"/>}

        </Fragment>
    );
}

export default Tables;