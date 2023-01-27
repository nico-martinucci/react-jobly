import { TextField, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useState, forwardRef, useContext } from "react";
import camelCase from "lodash/camelCase";
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import userContext from "./userContext";

/**
 * // TODO: add me
 * @returns 
 */
function Profile({ updateProfile }) {
    const { user } = useContext(userContext);
    const [formData, setFormData] = useState({
        username: user.username, 
        firstName: user.firstName, 
        lastName: user.lastName, 
        email: user.email
    });
    const [toast, setToast] = useState({ open: false, msg: null, style: null });

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
            await updateProfile(formData);
            setToast({ open: true, msg: "Updated successfully!", style: "success" })
        } catch (err) {
            console.log(err);
            setToast({ open: true, msg: err[0], style: "error" });
        }
    }

    const fields = ["Username", "First Name", "Last Name", "Email"];

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
            <h2>Profile Page</h2>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2} sx={{ width: "50%" }}>
                    {fields.map(f => (
                        <TextField
                            key={camelCase(f)}
                            label={f}
                            variant="standard"
                            name={camelCase(f)}
                            id={camelCase(f)}
                            type={"text"}
                            onChange={handleChange}
                            value={formData[camelCase(f)]}
                            disabled={f === "Username"}
                        />
                    ))}
                    <Button variant="outlined" type="submit">Update!</Button>
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


export default Profile;