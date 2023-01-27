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
function JobList({applyToJob}) {

    const [jobs, setJobs] = useState({
        data: null,
        isLoading: true,
    });

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
            <SearchForm filter={filter} />
            <JobCardList jobs={jobs.data} applyToJob={applyToJob} />
        </>


    );
}


export default JobList;