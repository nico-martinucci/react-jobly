import JobCard from "./JobCard";

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
        <div className="JobCardList">
            {jobs.map(job => (
                <JobCard key={job.id} job={job} />
            ))}
        </div>
    );
}


export default JobCardList;