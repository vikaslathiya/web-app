import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
    container: {
        "& h3": {
            marginTop: "0px",
        },
        "& form": {
            margin: "10px 20px",
        },
    },
    form: {
        "& div": {
            display: "flex",
            justifyContent: "space-between"
        },
        "& .MuiTextField-root": {
            margin: "8px",
            width: '25ch',
        },
        "& div .MuiFormControl-root": {
            width: "45%",
            margin: "8px 20px",
        },
        "& div .MuiFormControl-root .MuiFormLabel-root": {
            color: "#4a4a4a",
        },
        "& div .MuiFormControl-root .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "black",
        },
    },
    selectInput: {
        "& .MuiFormControl-root": {
            width: "91% !important",

        },
        "& .MuiFormControl-root .MuiOutlinedInput-root": {
            margin: "0px -19px !important"
        },
    },
    radioBtn: {
        "& .MuiFormGroup-root .MuiFormLabel-root": {
            color: "#4a4a4a",
        },
        "& .MuiFormGroup-root ": {
            alignItems: "center",
            margin: "4px 10px",
            width: "fit-content"
        },
        "& .MuiFormGroup-root .MuiFormControlLabel-root": {
            marginLeft: "6px",
            marginRight: "6px",
        },
        "& .MuiFormGroup-root .MuiFormControlLabel-root .MuiRadio-root": {
            color: "#9A1752",
            marginRight: "4px"
        }
    },
    formBtn: {
        "&": {
            display: "flex",
            justifyContent: "center !important",
        },
        "& button": {
            margin: "10px 15px",
            borderColor: "black",
            color: "black",
        },
        "& button:nth-child(2)": {
            backgroundColor: "#9A1752",
            color: "white",
        },
        "& button:hover": {
            borderColor: "#9A1752",
            color: "#9A1752",
            backgroundColor: "#f8d3e4",
        },
    }
}));