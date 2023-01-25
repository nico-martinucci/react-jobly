import { useState } from "react";

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
        console.log(formData);
        filter(formData.search);
    }

    return (
        <div className="SearchForm">
            <form onSubmit={handleSubmit}>
                <input
                    name="search"
                    id="search"
                    placeholder="Enter search term..."
                    onChange={handleChange}
                ></input>
                <button>Submit</button>
            </form>
        </div>
    );
}


export default SearchForm;