import React, {Fragment} from "react";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import {FormLabel, RadioGroup, FormControlLabel, Radio} from "@mui/material";
import {Container, Button} from "@mui/material";
import {useStyles} from "../../MuiStyles/AddCustomerStyle";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


const AddCustomer = () => {

    const inputChange = () => {

    }

    const myStyle = useStyles();

    const currencies = [
        {value: 'USD', label: '$'},
        {value: 'EUR', label: '€'},
        {value: 'BTC', label: '฿'},
        {value: 'JPY', label: '¥'},
    ];

    return (<Fragment>
            <Container fixed>
                <div className={myStyle.container}>
                    <h3>Add Customer</h3>
                    <Box component="form" className={myStyle.form} noValidate autoComplete="off">
                        <div>
                            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label"
                                        className={myStyle.radioBtn} name="row-radio-buttons-group">
                                <FormLabel htmlFor="outlined-adornment-password">Type of Customer:</FormLabel>
                                <FormControlLabel value="corporate" control={<Radio size="small"/>} label="Corporate"/>
                                <FormControlLabel value="private" control={<Radio size="small"/>} label="Private"/>
                            </RadioGroup>
                        </div>
                        <div>
                            <FormControl variant="outlined">
                                <FormLabel htmlFor="outlined-adornment-password" required>First Name</FormLabel>
                                <OutlinedInput
                                    onChange={inputChange}
                                    type="text"
                                    size="small"
                                    required
                                />
                            </FormControl>
                            <FormControl variant="outlined">
                                <FormLabel htmlFor="outlined-adornment-password" required>Family Name</FormLabel>
                                <OutlinedInput
                                    onChange={inputChange}
                                    type="text"
                                    size="small"
                                    required
                                />
                            </FormControl>
                        </div>
                        <div>
                            <FormControl variant="outlined">
                                <FormLabel htmlFor="outlined-adornment-password">Email Address</FormLabel>
                                <OutlinedInput
                                    onChange={inputChange}
                                    type="email"
                                    size="small"
                                />
                            </FormControl>
                            <FormControl variant="outlined">
                                <FormLabel htmlFor="outlined-adornment-password">Company Name</FormLabel>
                                <OutlinedInput
                                    onChange={inputChange}
                                    type="text"
                                    size="small"
                                />
                            </FormControl>
                        </div>
                        <div>
                            <FormControl variant="outlined" style={{width: "83.8%"}}>
                                <FormLabel htmlFor="outlined-adornment-password">Street</FormLabel>
                                <OutlinedInput
                                    onChange={inputChange}
                                    type="text"
                                    size="small"
                                />
                            </FormControl>
                        </div>
                        <div>
                            <FormControl variant="outlined">
                                <FormLabel htmlFor="outlined-adornment-password">Street No</FormLabel>
                                <OutlinedInput
                                    onChange={inputChange}
                                    type="text"
                                    size="small"
                                />
                            </FormControl>
                            <FormControl variant="outlined">
                                <FormLabel htmlFor="outlined-adornment-password">Street 2</FormLabel>
                                <OutlinedInput
                                    onChange={inputChange}
                                    type="text"
                                    size="small"
                                />
                            </FormControl>
                        </div>
                        <div>
                            <FormControl variant="outlined">
                                <FormLabel htmlFor="outlined-adornment-password">City</FormLabel>
                                <OutlinedInput
                                    onChange={inputChange}
                                    type="text"
                                    size="small"
                                />
                            </FormControl>
                            <FormControl variant="outlined">
                                <FormLabel htmlFor="outlined-adornment-password">Zip Code</FormLabel>
                                <OutlinedInput
                                    onChange={inputChange}
                                    type="text"
                                    size="small"
                                />
                            </FormControl>
                        </div>
                        <div>
                            <FormControl variant="outlined" className={myStyle.selectInput}>
                                <FormLabel htmlFor="outlined-adornment-password">Customer Type</FormLabel>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    size="small"
                                    onChange={inputChange}>
                                    {currencies.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>))}
                                </TextField>
                            </FormControl>
                            <FormControl variant="outlined" className={myStyle.selectInput}>
                                <FormLabel htmlFor="outlined-adornment-password">Country</FormLabel>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    size="small"
                                    onChange={inputChange}>
                                    {currencies.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>))}
                                </TextField>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl variant="outlined">
                                <FormLabel htmlFor="outlined-adornment-password" required>Contact No</FormLabel>
                                <OutlinedInput
                                    onChange={inputChange}
                                    type="text"
                                    size="small"
                                    required
                                />
                            </FormControl>
                            <FormControl variant="outlined">
                                <FormLabel htmlFor="outlined-adornment-password">Office No</FormLabel>
                                <OutlinedInput
                                    onChange={inputChange}
                                    type="text"
                                    size="small"
                                />
                            </FormControl>
                        </div>
                        <div>
                            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label"
                                        className={myStyle.radioBtn} name="row-radio-buttons-group">
                                <FormLabel htmlFor="outlined-adornment-password">Rounded Pricing:</FormLabel>
                                <FormControlLabel value="simple" control={<Radio size="small"/>} label="Simple"/>
                                <FormControlLabel value="roundUp" control={<Radio size="small"/>} label="Round Up"/>
                                <FormControlLabel value="roundDown" control={<Radio size="small"/>} label="Round Down"/>
                            </RadioGroup>
                        </div>
                        <div>
                            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label"
                                        className={myStyle.radioBtn} name="row-radio-buttons-group">
                                <FormLabel htmlFor="outlined-adornment-password">Status:</FormLabel>
                                <FormControlLabel value="active" control={<Radio size="small"/>} label="Active"/>
                                <FormControlLabel value="inactive" control={<Radio size="small"/>} label="Inactive"/>
                            </RadioGroup>
                        </div>
                        <div className={myStyle.formBtn}>
                            <Button variant="outlined">Cancel</Button>
                            <Button variant="contained">Add</Button>
                        </div>
                    </Box>
                </div>
            </Container>
        </Fragment>
    )
        ;
}

export default AddCustomer;