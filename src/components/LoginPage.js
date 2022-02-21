import React, { Fragment, useEffect, useState } from "react";
import classes from "./LoginPage.module.css";
import logo from "../img/logo.jpeg"

import {
    Box, Button, Checkbox, Container, FormControl,
    FormControlLabel, IconButton, InputAdornment, Link
} from "@mui/material";
import TextField from '@mui/material/TextField';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginAction } from "./store/loginReducer";


const LoginPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    // initial values of email and password
    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
    });


    // stay loggedin user
    useEffect(() => {
        const loggedIn = localStorage.getItem("authToken");
        if (loggedIn) {
            dispatch(loginAction.login({ isLogin: true, token: loggedIn }));
            history.replace("/home-page");
        }
    }, [dispatch]);


    // style for input element
    const useStyle = makeStyles(style => ({
        fontSize: {
            "& span:last-child": {
                fontSize: "13px",
            }
        },
        borderColor: {
            "& label.Mui-focused": {
                color: "#9A1752",
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: "#9A1752",
            },
        }
    }));
    const myStyle = useStyle();


    // toggle password visiblity
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };


    // access the input value
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };


    // form submit 
    const submitHandlar = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const validPassword = values.password !== "";

        if (validPassword) {
            await fetch("https://d.jeweltrace.in/login/", {
                method: "POST",
                body: JSON.stringify({
                    "username": values.email,
                    "password": values.password,
                    "type": "web"
                }),
                headers: {
                    "Content-Type": "application/json",
                },

            }).then(res => {

                if (res.ok) {
                    return res.json();
                }

            }).then(data => {

                if (data.status) {

                    localStorage.setItem("user", JSON.stringify(data));

                    dispatch(loginAction.login({
                        token: data.data.jwt_token,
                    }));

                    // alert("user login successfuly");

                    history.push("/home-page");

                }
                else {
                    alert(data.errors.msg);
                }
            })
        } else {
            alert("enter valid details!")
        }
        setIsLoading(false);
    }



    return (
        <Fragment>
            <Container maxWidth="sm">
                <div className={classes.container}>

                    <div className={classes.logo}>
                        <img src={logo} alt="logo" />
                    </div>

                    <div className={classes.formData}>
                        <form onSubmit={submitHandlar} autoComplete="off">

                            <Box sx={{ mb: "3px", display: 'flex', alignItems: 'flex-end' }}>
                                <EmailIcon sx={{ width: "20px", mr: 1, my: 0.5 }} />
                                <TextField id="input-with-sx"
                                    className={myStyle.borderColor}
                                    label="Username"
                                    variant="standard"
                                    onChange={handleChange('email')}
                                    sx={{ width: '30ch' }}
                                />

                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: "10px" }}>
                                <LockIcon sx={{ width: "20px", mr: 1, my: 0.5 }} />
                                <FormControl className={myStyle.borderColor} sx={{ width: '30ch' }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                    <Input
                                        id="standard-adornment-password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        autoComplete="off"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                >
                                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: "5px" }}>
                                <FormControlLabel
                                    className={myStyle.fontSize}
                                    control={<Checkbox defaultChecked size="small" />}
                                    label="Secure Login"
                                />
                                <Link color="secondary" href="#" underline="none"
                                    sx={{ m: "auto", mr: 0, mt: "3px", float: "right", fontSize: "14px" }}>
                                    Forgot Password
                                </Link>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Button type="submit"
                                    sx={{ m: "auto", mt: "12px", borderRadius: "15px", backgroundColor: "#9A1752" }}
                                    color="secondary"
                                    disabled={isLoading ? true : false}
                                    variant="contained">
                                    {isLoading ? "Loadding..." : "Login"}
                                </Button>
                            </Box>

                        </form>
                    </div>

                    <div className={classes.footer}>
                        <p>Copyright &copy; Spacecode SAS. 2020 All rights reserved.</p>
                    </div>

                </div>
            </Container>

        </Fragment >
    );
}

export default LoginPage;