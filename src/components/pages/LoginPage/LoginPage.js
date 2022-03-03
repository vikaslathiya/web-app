import React, {Fragment, useEffect, useState} from "react";

import logo from "../../../img/logo.jpeg"
import {loginAction} from "../../store/loginReducer";

import {
    Box, Button, Checkbox, Container, FormControl,
    FormControlLabel, IconButton, InputAdornment, Link
} from "@mui/material";
import TextField from '@mui/material/TextField';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import {Visibility, VisibilityOff} from "@mui/icons-material";

import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

import {useStyle} from "./LoginStyles";
import {loginApp} from "./loginData";


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

    // stay logged user
    useEffect(() => {
        const loggedIn = localStorage.getItem("authToken");
        if (loggedIn) {
            dispatch(loginAction.login({isLogin: true, token: loggedIn}));
        }
    }, [dispatch]);

    useEffect(() => {
        const getPath = localStorage.getItem("currentPath")
        if (getPath) {
            history.replace(getPath);
        }
    }, [history])

    // style for input element
    const myStyle = useStyle();

    // toggle password visibility
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    // access the input value
    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    // form submit 
    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const validPassword = values.password !== "";

        if (validPassword) {
            await dispatch(loginApp(values.email, values.password));
            history.push("/home-page");
        } else {
            alert("enter valid details!")
        }
        setIsLoading(false);
    }

    return (
        <Fragment>
            <Container maxWidth="sm">
                <div className={myStyle.container}>

                    <div className={myStyle.logo}>
                        <img src={logo} alt="logo"/>
                    </div>

                    <div className={myStyle.formData}>
                        <form onSubmit={submitHandler} autoComplete="off">

                            <Box className={myStyle.formIcon}>
                                <EmailIcon/>
                                <TextField id="input-with-sx"
                                           className={myStyle.borderColor}
                                           label="Username"
                                           variant="standard"
                                           onChange={handleChange('email')}
                                           sx={{width: '30ch'}}
                                />

                            </Box>

                            <Box className={myStyle.formIcon}>
                                <LockIcon/>
                                <FormControl className={myStyle.borderColor} sx={{width: '30ch'}} variant="standard">
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
                                                    {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Box>

                            <Box className={myStyle.forgetPassword}>
                                <FormControlLabel
                                    control={<Checkbox defaultChecked size="small"/>}
                                    label="Secure Login"
                                />
                                <Link color="secondary" href="#" underline="none">
                                    Forgot Password
                                </Link>
                            </Box>

                            <Box className={myStyle.loginBtn}>
                                <Button type="submit"
                                        color="secondary"
                                        disabled={isLoading}
                                        variant="contained">
                                    {isLoading ? "Loading..." : "Login"}
                                </Button>
                            </Box>

                        </form>
                    </div>

                    <div className={myStyle.footer}>
                        <p>Copyright &copy; Spacecode SAS. 2020 All rights reserved.</p>
                    </div>

                </div>
            </Container>

        </Fragment>
    );
}

export default LoginPage;