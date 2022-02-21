import { makeStyles } from "@mui/styles";

export const useStyle = makeStyles(style => ({
    container: {
        "&": {
            boxShadow: "0 0 4px #8d8d8d",
            backgroundColor: "#f7f7f7",
            margin: "auto",
            marginTop: "20%",
            width: "75%",
            padding: "7px",
        }
    },
    logo: {
        "&": {
            display: "flex",
            marginTop: "15px",
        },
        "& img": {
            margin: "auto",
            width: "250px",
        },
    },
    formData: {
        "&": {
            margin: "15px 45px 15px 55px",
        }
    },
    borderColor: {
        "& label.Mui-focused": {
            color: "#9A1752",
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: "#9A1752",
        },
    },
    formIcon: {
        "&": {
            display: 'flex',
            alignItems: 'flex-end',
            marginTop: "15px",
        },
        "& .MuiSvgIcon-root": {
            width: "20px",
            marginRight: "8px",
            margin: "4px 0",
        },
    },
    forgetPassword: {
        "&": {
            display: 'flex',
            alignItems: 'flex-end',
            marginTop: "5px",
        },
        "& .MuiFormControlLabel-root span:last-child": {
            fontSize: "13px",
        },
        "& a": {
            margin: "auto",
            marginRight: 0,
            marginTop: "3px",
            float: "right",
            fontSize: "14px"
        },
    },
    loginBtn: {
        "&": {
            display: 'flex',
            alignItems: 'flex-end'
        },
        "& button": {
            margin: "auto",
            marginTop: "12px",
            borderRadius: "15px",
            backgroundColor: "#9A1752"
        },
    },
    footer: {
        "&": {
            color: "gray",
            fontSize: "12px",
            textAlign: "center",
        }
    }
}));