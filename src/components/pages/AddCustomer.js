import React, {Fragment, useState} from "react";
import axios from "axios";

import {Box, FormControl, OutlinedInput, FormLabel, Container} from '@mui/material';
import {RadioGroup, FormControlLabel, Radio, TextField} from '@mui/material';
import {Button, MenuItem} from "@material-ui/core";

import {useStyles} from "../../MuiStyles/AddCustomerStyle";
import {userDataAction} from "../store/userDataReducer";
import {editCustomerData} from "../store/EditData"

import {useDispatch, useSelector} from "react-redux";

import {useHistory} from "react-router-dom";


const AddCustomer = () => {
    const editCustomer = useSelector(state => state.getCustomers.editable)
    const editMode = useSelector(state => state.getCustomers.editMode)
    const isLoading = useSelector(state => state.getCustomers.isLoading)
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

    const addFormHandler = async (e) => {
        e.preventDefault();

        console.log("clicked")

        if (inputValue.firstName !== "" || inputValue.familyName !== "" || inputValue.contactNumber !== "") {

            if (editMode) {
                // redux thunk function call
                await dispatch(editCustomerData(inputValue, webToken));

                // const users = await axios.put("https://d.jeweltrace.in/customer/", inputValue, {
                //     headers: {
                //         'Content-Type': 'application/json',
                //         // "Access-Control-Allow-Origin": 'origin-list',
                //         "x-web-token": jwtToken,
                //     }
                // })
                dispatch(userDataAction.closeEditCustomer());
            } else {

                const users = await axios.post("https://d.jeweltrace.in/customer/", inputValue, {
                    headers: {
                        'Content-Type': 'application/json',
                        // "Access-Control-Allow-Origin": 'origin-list',
                        "x-web-token": webToken,
                    }
                })
                console.log(users)
            }
            history.push("/home-page/customers");

        } else {

            alert("Enter required Fields!")
        }


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
                        {!isLoading &&
                            <Button variant="contained" onClick={addFormHandler}
                                    disableRipple>{editMode ? "Edit" : "Add"}</Button>}
                        {isLoading && <Button disabled={isLoading}
                                              variant="contained">{editMode ? "Updating..." : "Adding..."}</Button>}
                    </div>
                </Box>
            </div>
        </Container>
    </Fragment>);
}

export default AddCustomer;