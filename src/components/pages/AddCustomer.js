import React, {Fragment, useState} from "react";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import {FormLabel, RadioGroup, FormControlLabel, Radio} from "@mui/material";
import {Container} from "@mui/material";
import {useStyles} from "../../MuiStyles/AddCustomerStyle";
import TextField from '@mui/material/TextField';
import {useDispatch, useSelector} from "react-redux";
import {userDataAction} from "../store/userDataReducer";
import {useHistory} from "react-router-dom";
import {Button, MenuItem} from "@material-ui/core";
import {editCustomerData} from "../store/EditData";
import axios from "axios";


const AddCustomer = () => {
    const editCustomer = useSelector(state => state.getCustomers.editable)
    const editMode = useSelector(state => state.getCustomers.editMode)
    const dispatch = useDispatch();
    const history = useHistory();
    const [inputValue, setInputValue] = useState(editMode ? editCustomer : "");

    const inputChange = (prop) => (e) => {
        e.preventDefault();
        setInputValue({...inputValue, [prop]: e.target.value, updatedAt: new Date().toISOString()});
        // console.log(inputValue)
    }
    const webToken = localStorage.getItem("authToken");
    console.log(inputValue);

    const addFormHandler = (e) => {
        e.preventDefault();

        console.log("clicked")

        if (editMode) {
            // redux thunk function call
            dispatch(editCustomerData(inputValue, webToken));

            // const users = await axios.put("https://d.jeweltrace.in/customer/", inputValue, {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         // "Access-Control-Allow-Origin": 'origin-list',
            //         "x-web-token": jwtToken,
            //     }
            // })
        } else {
            const users = axios.post("https://d.jeweltrace.in/customer/", inputValue, {
                headers: {
                    'Content-Type': 'application/json',
                    // "Access-Control-Allow-Origin": 'origin-list',
                    "x-web-token": webToken,
                }
            })
            console.log(users)
        }

        history.goBack();
    }

    const cancelFormHandler = (e) => {
        e.preventDefault();
        dispatch(userDataAction.closeEditCustomer());
        history.goBack();
    }

    const myStyle = useStyles();

    const customerType = [{value: 'corporate', label: 'Corporate'}, {value: 'private', label: 'Private'},];

    const countries = [{value: 'india', label: 'India'}, {value: 'bangladesh', label: 'Bangladesh'}, {
        value: 'sriLanka',
        label: 'Sri Lanka'
    }, {value: 'china', label: 'China'},];

    return (<Fragment>
        <Container fixed>
            <div className={myStyle.container}>
                <h3>Add Customer</h3>
                <Box component="form" className={myStyle.form} noValidate autoComplete="off">
                    <div className={myStyle.radioBtn}>
                        <RadioGroup row aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={editMode ? inputValue.isPrivateCustomer : false}
                                    onChange={inputChange("isPrivateCustomer")}>
                            <FormLabel id="demo-controlled-radio-buttons-group">Type of Customer:</FormLabel>
                            <FormControlLabel value={false} control={<Radio size="small"/>} label="Corporate"/>
                            <FormControlLabel value={true} control={<Radio size="small"/>} label="Private"/>
                        </RadioGroup>
                    </div>
                    <div>
                        <FormControl variant="outlined">
                            <FormLabel htmlFor="outlined-adornment-password" required>First Name</FormLabel>
                            <OutlinedInput
                                onChange={inputChange("firstName")}
                                type="text"
                                size="small"
                                defaultValue={inputValue.firstName}
                                required
                            />
                        </FormControl>
                        <FormControl variant="outlined">
                            <FormLabel htmlFor="outlined-adornment-password" required>Family Name</FormLabel>
                            <OutlinedInput
                                onChange={inputChange("familyName")}
                                type="text"
                                size="small"
                                defaultValue={inputValue.familyName}
                                required
                            />
                        </FormControl>
                    </div>
                    <div>
                        <FormControl variant="outlined">
                            <FormLabel htmlFor="outlined-adornment-password">Email Address</FormLabel>
                            <OutlinedInput
                                onChange={inputChange("email")}
                                type="email"
                                size="small"
                                defaultValue={inputValue.email}
                            />
                        </FormControl>
                        <FormControl variant="outlined">
                            <FormLabel htmlFor="outlined-adornment-password">Company Name</FormLabel>
                            <OutlinedInput
                                onChange={inputChange("companyName")}
                                type="text"
                                size="small"
                                defaultValue={inputValue.companyName}
                            />
                        </FormControl>
                    </div>
                    <div>
                        <FormControl variant="outlined" style={{width: "96%"}}>
                            <FormLabel htmlFor="outlined-adornment-password">Street</FormLabel>
                            <OutlinedInput
                                onChange={inputChange("street")}
                                type="text"
                                size="small"
                                defaultValue={inputValue.street}
                            />
                        </FormControl>
                    </div>
                    <div>
                        <FormControl variant="outlined">
                            <FormLabel htmlFor="outlined-adornment-password">Street No</FormLabel>
                            <OutlinedInput
                                onChange={inputChange("streetNumber")}
                                type="text"
                                size="small"
                                defaultValue={inputValue.streetNumber}
                            />
                        </FormControl>
                        <FormControl variant="outlined">
                            <FormLabel htmlFor="outlined-adornment-password">Street 2</FormLabel>
                            <OutlinedInput
                                onChange={inputChange("street2")}
                                type="text"
                                size="small"
                                defaultValue={inputValue.street2}
                            />
                        </FormControl>
                    </div>
                    <div>
                        <FormControl variant="outlined">
                            <FormLabel htmlFor="outlined-adornment-password">City</FormLabel>
                            <OutlinedInput
                                onChange={inputChange("city")}
                                type="text"
                                size="small"
                                defaultValue={inputValue.city}
                            />
                        </FormControl>
                        <FormControl variant="outlined">
                            <FormLabel htmlFor="outlined-adornment-password">Zip Code</FormLabel>
                            <OutlinedInput
                                onChange={inputChange("pin")}
                                type="text"
                                size="small"
                                defaultValue={inputValue.pin}
                            />
                        </FormControl>
                    </div>
                    <div>
                        <FormControl variant="outlined" className={myStyle.selectInput}>
                            <FormLabel htmlFor="outlined-adornment-password">Customer Type</FormLabel>
                            <TextField
                                id="outlined-select-customer"
                                select={true}
                                size="small"
                                value={editMode ? inputValue.customerType.toLowerCase() : customerType[0].value}
                                onChange={inputChange("customerType")}>
                                {customerType.map((option) => (<MenuItem key={option.value}
                                                                         value={option.value}>
                                    {option.label}
                                </MenuItem>))}
                            </TextField>
                        </FormControl>
                        <FormControl variant="outlined" className={myStyle.selectInput}>
                            <FormLabel htmlFor="outlined-adornment-password">Country</FormLabel>
                            <TextField
                                id="outlined-select-name"
                                select={true}
                                size="small"
                                value={editMode ? inputValue.country.toLowerCase() : countries[0].value}
                                onChange={inputChange("country")}>
                                {countries.map((option) => (<MenuItem key={option.value}
                                                                      value={option.value}>
                                    {option.label}
                                </MenuItem>))}
                            </TextField>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl variant="outlined">
                            <FormLabel htmlFor="outlined-adornment-password" required>Contact No</FormLabel>
                            <OutlinedInput
                                onChange={inputChange("contactNumber")}
                                type="text"
                                size="small"
                                value={inputValue.contactNumber}
                                required
                            />
                        </FormControl>
                        <FormControl variant="outlined">
                            <FormLabel htmlFor="outlined-adornment-password">Office No</FormLabel>
                            <OutlinedInput
                                defaultValue={inputValue.contacts}
                                onChange={inputChange("contacts")}
                                type="text"
                                size="small"
                            />
                        </FormControl>
                    </div>
                    <div className={myStyle.radioBtn}>
                        <RadioGroup row aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={editMode ? inputValue.roundOffSale : "simple"}
                                    onChange={inputChange("roundOffSale")}>
                            <FormLabel htmlFor="outlined-adornment-password">Rounded Pricing:</FormLabel>
                            <FormControlLabel value="simple" control={<Radio size="small"/>} label="Simple"/>
                            <FormControlLabel value="roundUp" control={<Radio size="small"/>} label="Round Up"/>
                            <FormControlLabel value="roundDown" control={<Radio size="small"/>}
                                              label="Round Down"/>
                        </RadioGroup>
                    </div>
                    <div className={myStyle.radioBtn}>
                        <RadioGroup row aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    onChange={inputChange("status")}
                                    value={editMode ? inputValue.status : 1}>
                            <FormLabel htmlFor="outlined-adornment-password">Status:</FormLabel>
                            <FormControlLabel value={1} control={<Radio size="small"/>} label="Active"/>
                            <FormControlLabel value={0} control={<Radio size="small"/>} label="Inactive"/>
                        </RadioGroup>
                    </div>
                    <div className={myStyle.formBtn}>
                        <Button variant="outlined" onClick={cancelFormHandler}>Cancel</Button>
                        <Button variant="contained" onClick={addFormHandler}>{editMode ? "Edit" : "Add"}</Button>
                    </div>
                </Box>
            </div>
        </Container>
    </Fragment>);
}

export default AddCustomer;