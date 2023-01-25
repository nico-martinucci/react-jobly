import { useEffect, useState } from "react";
import JobCardList from "./JobCardList";
import SearchForm from "./SearchForm";
import JoblyApi from "./api";

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
        title: null
    });
    console.log("jobs, ", jobs);

    useEffect(function getJobs() {
        async function getJobsReally() {
            const response = await JoblyApi.getJobs(jobs.title);
            setJobs({
                data: response,
                isLoading: false,
                title: null
            });
        }
        if (jobs.isLoading) { 
            getJobsReally(); 
        }
    }, [jobs]);

    function filter(title) {
        setJobs({
            data: null,
            isLoading: true,
            title
        });
    }

    if (jobs.isLoading) return <p>Loading...</p>;

    return (
        <>
            <h2>Job List</h2>
            <SearchForm filter={filter} />
            <JobCardList jobs={jobs}/>
        </>


    );
}


export default JobList;