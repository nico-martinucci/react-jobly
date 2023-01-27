import JobCard from "./JobCard";
import { Stack } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2';

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
        <Grid2 container spacing={2} mt={2}>
            {jobs.map(job => (
                <Grid2 xs={12} md={4}>
                    <JobCard key={job.id} job={job} />
                </Grid2>

            ))}
        </Grid2>
    );
};


export default JobCardList;