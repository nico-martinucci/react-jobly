import { TextField, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useState, forwardRef } from "react";
import camelCase from "lodash/camelCase";
import { useNavigate } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


const defaultInitialFormData = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
};

/**
 *Allows user to be created and recieve a JWT
*
* Prop: signup - a function passed down that allows the user state to be set and
for a post to be made creating a User
*
* State: formData allows the component to be controlled.
 */
function SignupForm({ signup }) {

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
            await signup(formData);
        } catch (err) {
            console.log(err);
            setToast({ open: true, msg: err[0], stlye:"error" });
            return;
        }

        navigate("/");
    }

    const fields = ["Username", "Password", "First Name", "Last Name", "Email"];

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
            <h2>Signup Page</h2>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2} sx={{ width: "50%" }}>
                    {fields.map(f => (
                        <TextField
                            key={camelCase(f)}
                            label={f}
                            variant="standard"
                            name={camelCase(f)}
                            id={camelCase(f)}
                            type={f === "Password" ? "password" : "text"}
                            onChange={handleChange}
                        />
                    ))}
                    <Button variant="outlined" type="submit">Signup!</Button>
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


export default SignupForm;