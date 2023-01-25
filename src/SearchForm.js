import { useState } from "react";
import { TextField, Button } from "@mui/material";

/**
 * SearchForm: form for top of companies and jobs to filter down results.
 * 
 * Props: 
 * - filter(): function from parent component to filter results
 * 
 * State:
 * - formData: currently entered data in the form
 * 
 * {CompanyList, JobList} -> SearchForm
 */
function SearchForm({ filter }) {
    const [formData, setFormData] = useState({ search: null });

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
        filter(formData.search.trim());
    }

    return (
        <div className="SearchForm">                
            <form onSubmit={handleSubmit}>
                <TextField 
                    label="Enter search term..." 
                    variant="standard" 
                    name="search"
                    id="search"
                    onChange={handleChange}
                />
                <Button variant="outlined" type="submit">Submit</Button>
            </form>
        </div>
    );
}


export default SearchForm;