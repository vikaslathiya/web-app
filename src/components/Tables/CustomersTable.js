import React, {Fragment} from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {TablePagination} from "@material-ui/core";
import {useStyles} from "../../Assets/Styles/CustomerStyles";
import {useSelector} from "react-redux";

const CustomersTable = (props) => {
    const {
        onDragEnd, onDragStart, columns, page, dragItem, dragOverItem,
        rowsPerPage, editCustomer, changePage, changeRowsPerPage, drop
    } = props;
    const isLoading = useSelector(state => state.getCustomers.isLoading);
    const customer = useSelector(state => state.getCustomers.users);
    const NoCustomer = customer.length === 0;

    // mui styles
    const myStyle = useStyles();

    const tableCellStyle = {
        position: "sticky",
        right: 0,
        minWidth: 120,
        color:"white",
    }

    const dragStart = (e, position) => {
        dragItem.current = position;
        console.log(e.target.innerHTML);
    };

    const dragEnter = (e, position) => {
        dragOverItem.current = position;
        console.log(e.target.innerHTML);
    };

    return (
        <Fragment>
            <TableContainer className={myStyle.tables}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
                            <Droppable droppableId="droppable" direction="horizontal">
                                {(provided) => (<TableRow
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
                                                </TableCell> :
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    sx={{minWidth: column.minWidth}}
                                                >
                                                    {/*<Draggable key={column.id} draggableId={column.id}*/}
                                                    {/*           index={index}>*/}
                                                    {/*    {(provided) => (*/}
                                                    <div key={index} draggable
                                                         onDragStart={(e) => dragStart(e, index)}
                                                         onDragEnter={(e) => dragEnter(e, index)}
                                                         onDragEnd={drop}
                                                         style={{
                                                             color: "white",
                                                             fontWeight: 500,
                                                             border: "none",
                                                             cursor: "move",
                                                             padding: "5px",
                                                             zIndex: 1000,
                                                         }}
                                                        // ref={provided.innerRef}
                                                        // {...provided.draggableProps}
                                                        // {...provided.dragHandleProps}
                                                    >
                                                        {column.label}
                                                    </div>
                                                    {/*    )}*/}
                                                    {/*</Draggable>*/}
                                                    {/*{provided.placeholder}*/}
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