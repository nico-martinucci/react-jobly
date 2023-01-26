import { TextField, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";

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
function Login({ login }) {

    const [formData, setFormData] = useState(defaultInitialFormData);

    /** Update form input. */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData((fData) => ({
            ...fData,
            [name]: value,
        }));
    }

    /** Call parent function with the user's inputs */
    function handleSubmit(evt) {
        evt.preventDefault();
        login(formData);
    }

    const fields = ["Username", "Password"];

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
                            onChange={handleChange}
                        />
                    ))}
                    <Button variant="outlined" type="submit">Login!</Button>
                </Stack>
            </form>
        </>
    );
}


export default Login;