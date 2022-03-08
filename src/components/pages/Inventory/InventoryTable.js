import React, {Fragment} from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TableBody from "@mui/material/TableBody";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PictureAsPdfSharpIcon from "@mui/icons-material/PictureAsPdfSharp";
import {TablePagination} from "@material-ui/core";
import {useStyles} from "./InventoryStyle";
import {useSelector} from "react-redux";

const InventoryTable = (props) => {
    const {onDragEnd, columns, sorting, page, changePage, changeRowsPerPage, rowsPerPage} = props;
    const userData = useSelector(state => state.getInventory.userData)
    const isLoading = useSelector(state => state.getInventory.isLoading)
    const user = useSelector(state => state.getInventory.user)
    const NoData = userData.length === 0;

    // mui styles
    const myStyle = useStyles();

    const style = {
        right: 0,
        position: "sticky",
        minWidth: "100px"
    }

    return (
        <Fragment>
            <TableContainer sx={{maxHeight: "383px"}} className={myStyle.tables}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="droppable" direction="horizontal">
                                {(provided, snapshot) => (
                                    <TableRow
                                        className={snapshot.isUsingPlaceholder ? myStyle.dragTableCell : myStyle.tableCell}
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {columns.map((column, index) => (
                                            column.id === "action" ?
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    onClick={() => sorting(column.id)}
                                                    sx={style}
                                                >
                                                    {column.label}
                                                </TableCell> :
                                                <Draggable key={column.id} draggableId={column.id}
                                                           index={index}>
                                                    {(provided) => (
                                                        <TableCell
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            key={column.id}
                                                            align={column.align}
                                                            onClick={() => sorting(column.id)}
                                                            sx={{minWidth: column.minWidth}}
                                                        >
                                                            {column.label}
                                                            <ArrowDropDownIcon style={{margin: "-6px 2px"}}/>
                                                        </TableCell>
                                                    )}
                                                </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </TableRow>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </TableHead>
                    <TableBody>
                        {!NoData && !isLoading && userData.map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}
                                          className={myStyle.tableRow}>
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
                {NoData && !isLoading && <h4 style={{textAlign: "center"}}>No Inventory Found!</h4>}
                {isLoading && <h4 style={{textAlign: "center"}}>Please wait...</h4>}
            </TableContainer>
            <TablePagination
                className={myStyle.pagination}
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={user.totalPage === undefined ? 0 : user.totalPage}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={changePage}
                onRowsPerPageChange={changeRowsPerPage}
            />
        </Fragment>
    );
};

export default InventoryTable;