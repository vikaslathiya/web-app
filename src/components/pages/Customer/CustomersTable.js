import React, {Fragment} from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {TablePagination} from "@material-ui/core";
import {useStyles} from "./CustomerStyles";
import {useSelector} from "react-redux";

const CustomersTable = (props) => {
    const {onDragEnd, columns, page, rowsPerPage, editCustomer, changePage, changeRowsPerPage} = props;
    const isLoading = useSelector(state => state.getCustomers.isLoading);
    const customer = useSelector(state => state.getCustomers.users);
    const NoCustomer = customer.length === 0;

    // mui styles
    const myStyle = useStyles();

    const tableCellStyle = {
        position: "sticky",
        right: 0,
        minWidth: 120,
    }

    const getStyle = (isDragging, draggableStyle) => ({
        zIndex: isDragging && (1000),
        color: isDragging && ("black"),
        ...draggableStyle
    })

    return (
        <Fragment>
            <TableContainer className={myStyle.tables}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="droppable" direction="horizontal">
                                {(provided, snapshot) => (<TableRow
                                        className={myStyle.tableRow}
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {columns.map((column, index) => (

                                            column.id === "action" ? <TableCell
                                                key={column.id}
                                                align={column.align}
                                                sx={tableCellStyle}
                                            >
                                                {column.label}
                                            </TableCell> : <TableCell
                                                key={column.id}
                                                align={column.align}
                                            >
                                                <Draggable key={column.id} draggableId={column.id}
                                                           index={index}>
                                                    {(provided) => (<div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={getStyle(snapshot.isDragging, provided.draggableProps.style)}
                                                        >
                                                            {column.label}
                                                        </div>
                                                    )}
                                                </Draggable>
                                                {provided.placeholder}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </TableHead>
                    {!NoCustomer && !isLoading && <TableBody>
                        {customer.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (<TableRow hover role="checkbox" tabIndex={-1} key={row._id}
                                                  className={myStyle.tableBody}>
                                    {columns.map((column) => {
                                        const value = column.id === "firstName" ? `${row[column.id]} ${row["familyName"]}` : row[column.id];

                                        return (column.id === "action" ?
                                            <TableCell key={column.id} align={column.align}
                                                       sx={tableCellStyle}>
                                                <div className={myStyle.icons}>
                                                    <VisibilityIcon/>
                                                    <EditIcon onClick={() => editCustomer(row)}/>
                                                    <DeleteIcon/>
                                                </div>
                                            </TableCell> : <TableCell key={column.id} align={column.align}>
                                                {value}
                                            </TableCell>);
                                    })}
                                </TableRow>);
                            })}
                    </TableBody>}
                </Table>
                {NoCustomer && !isLoading && <h4 style={{textAlign: "center"}}>No Customer Found!</h4>}
                {isLoading && <h4 style={{textAlign: "center"}}>Please wait...</h4>}
            </TableContainer>
            <TablePagination
                className={myStyle.pagination}
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={customer.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={changePage}
                onRowsPerPageChange={changeRowsPerPage}
            />
        </Fragment>
    );
}

export default CustomersTable;