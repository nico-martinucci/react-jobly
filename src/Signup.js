import { TextField, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";

const defaultInitialFormData = {
    username: "",
    password: "",
    "first-name": "",
    "last-name": "",
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
function Signup({ signup }) {

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
        signup(formData);
    }

    const fields = ["Username", "Password", "First Name", "Last name", "Email"];

    return (
        <>
            <h2>Signup Page</h2>
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
                    <Button variant="outlined" type="submit">Signup!</Button>
                </Stack>
            </form>
        </>
    );
}


export default Signup;