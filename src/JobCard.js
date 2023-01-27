import { Card, CardContent, Button, Stack } from '@mui/material';
import currency from "currency.js";
import { useContext, useState, forwardRef } from 'react';
import userContext from './userContext';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

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
function JobCard({ job, applyToJob }) {
    const { user } = useContext(userContext);
    const [format, setFormat] = useState(getAppliedStatus);
    const [toast, setToast] = useState({ open: false, msg: null, style: null });

    function getAppliedStatus() {
        if (user.applications.includes(job.id)) {
            return { text: "Applied", variant: "outlined" };
        } else {
            return { text: "Apply", variant: "contained" };
        }
    }

    async function applyToClickedJob() {
        try {
            await applyToJob(job.id);
            setFormat({ text: "Applied", variant: "outlined" });
            setToast({ open: true, msg: "Applied!", style: "success" });
        } catch (err) {
            setToast({ open: true, msg: "Already applied!", style: "warning" });
        }
    }

    /******** SNACKBAR START *******/

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setToast(curr => ({...curr, open: false}));
    };

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    /********* SNACKBAR END *******/

    return (
        <>
            <Card variant="outlined">
                <CardContent>
                    <p><b>{job.title}</b></p>
                    <p>{job.companyName}</p>
                    <p>
                        <small>Salary: {currency(job.salary, { seperator: "," }).format()}</small>
                    </p>
                    {(job.equity !== "0") && <p>
                        <small>Equity: {job.equity}</small>
                    </p>}
                    <Stack direction="row" justifyContent="end">
                        <Button
                            size="small"
                            variant={format.variant}
                            color="secondary"
                            onClick={applyToClickedJob}
                        >{format.text}</Button>
                    </Stack>
                </CardContent>
            </Card>
            <Snackbar
                open={toast.open}
                autoHideDuration={6000}
                onClose={handleClose} >
                <Alert onClose={handleClose} severity={toast.style} sx={{ width: '100%' }}>
                    {toast.msg}
                </Alert>
            </Snackbar>
        </>
    );
}


export default JobCard;