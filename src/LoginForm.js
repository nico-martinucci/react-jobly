import { TextField, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useState, forwardRef } from "react";
// import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const defaultInitialFormData = {
    username: "",
    password: ""

};

/**
 *Allows user to login and recieve a JWT
*
* Prop: login - a function passed down that allows the user state to be set
*
* State: formData allows the component to be controlled.
 */
function LoginForm({ login }) {

    const [formData, setFormData] = useState(defaultInitialFormData);
    const [toast, setToast] = useState({ open: false, msg: null, style: null });

    const navigate = useNavigate();


    /** Update form input. */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData((fData) => ({
            ...fData,
            [name]: value,
        }));
    }

    /** Call parent function with the user's inputs */
    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            await login(formData);
            setToast({ open: true, msg: "Logged in!", style: "success" });
        } catch (err) {
            console.log(err);
            setToast({ open: true, msg: err[0], style: "error" });
            return;
        }

        navigate("/");
    }

    const fields = ["Username", "Password"];

    /******** SNACKBAR START *******/

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setToast(curr => ({...curr, open: false}));
    };

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    /********* SNACKBAR END *******/

    return (
        <>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2} sx={{ width: "50%" }}>
                    {fields.map(f => (
                        <TextField
                            key={f.split(" ").join("-").toLowerCase()}
                            label={f}
                            variant="standard"
                            name={f.split(" ").join("-").toLowerCase()}
                            id={f.split(" ").join("-").toLowerCase()}
                            type={f === "Password" ? "password" : "text"}
                            onChange={handleChange}
                        />
                    ))}
                    <Button variant="outlined" type="submit">Login!</Button>
                </Stack>
            </form>
            <Snackbar
                open={toast.open}
                autoHideDuration={6000}
                onClose={handleClose} >
                <Alert onClose={handleClose} severity={toast.style} sx={{ width: '100%' }}>
                    {toast.msg}
                </Alert>
            </Snackbar>
        </>
    );
}


export default LoginForm;