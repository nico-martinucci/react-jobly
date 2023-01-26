import { useEffect, useState } from "react";
import JobCardList from "./JobCardList";
import SearchForm from "./SearchForm";
import JoblyApi from "./api";
import { LinearProgress } from "@mui/material";

/**
 * Return a list of JobCard components. Can return all or some.
 * 
 * State: Jobs
 * 
 * RouteList -> JobList -> {SearchForm, JobCard}
 * 
 */
function JobList() {

    const [jobs, setJobs] = useState({
        data: null,
        isLoading: true,
    });
    console.log("jobs, ", jobs);

    useEffect(function getJobs() {
        filter();
    }, []);

    async function filter(title) {
        const response = await JoblyApi.getJobs(title);
        setJobs({
            data: response,
            isLoading: false,
        });
    }

    if (jobs.isLoading) return <p><LinearProgress /></p>;

    return (
        <>
            <h2>Job List</h2>
            <SearchForm filter={filter} />
            <JobCardList jobs={jobs.data} />
        </>


    );
}


export default JobList;