import JobCard from "./JobCard";
import { Stack } from "@mui/material";

/**
 * JobCardList: renders a list of JobCard components, based on the provided
 * list of jobs
 * 
 * Props: 
 * - jobs: array of jobs -> {id, title, salary, equity, 
 *                              companyHandle, companyName}
 * 
 * State: N/A
 * 
 * {JobList, CompanyDetail} -> JobCardList
 */
function JobCardList({ jobs }) {

    return (
        <Stack spacing={2} mt={2}>
            {jobs.map(job => (
                <JobCard key={job.id} job={job} />
            ))}
        </Stack>
    );
}


export default JobCardList;