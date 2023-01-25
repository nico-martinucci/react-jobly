/**
 * JobCard: renders an individual job card.
 * 
 * Props:
 * - job: object for a single job
 * 
 * State: N/A
 * 
 * JobCardList -> [JobCard, JobCard, ... ]
 */
function JobCard({ job }) {

    return (
        <div className="JobCard">
            <p><b>{job.title}</b></p>
            <p>{job.companyName}</p>
            <p>
                <small>Salary: {job.salary}</small>
            </p>
            <p>
                <small>Equity: {job.equity}</small>
            </p>
        </div>
    )
}


export default JobCard;