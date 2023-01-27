import { Route, Routes } from "react-router-dom";
import Homepage from "./Homepage.js";
import CompanyList from "./CompanyList.js";
import JobList from "./JobList.js";
import CompanyDetail from "./CompanyDetail.js";
import LoginForm from "./LoginForm.js";
import SignupForm from "./SignupForm";
import Profile from "./Profile.js";
import NotFound from "./NotFound.js";
import { Container } from "@mui/system";
import { useContext } from "react";
import userContext from "./userContext.js";
import { Navigate } from "react-router-dom";

/**
 * RoutesList: renders individual Route components
 * 
 * Props: N/A
 * 
 * State: N/A
 */
function RoutesList({ login, signup, updateProfile }) {

    const { user } = useContext(userContext);
    console.log("user at top of routes list", user);
    return (
        <Container>
            <Routes>
                <Route path="/" element={<Homepage />} />
                {!user && <>
                    <Route path="/login" element={<LoginForm login={login} />} />
                    <Route path="/signup" element={<SignupForm signup={signup} />} />
                </>}
                {user && <>
                    <Route path="/companies" element={<CompanyList />} />
                    <Route path="/jobs" element={<JobList />} />
                    <Route path="/companies/:handle" element={<CompanyDetail />} />
                    <Route path="/profile" element={<Profile updateProfile={updateProfile} />} />
                </>}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Container>
    );
}


export default RoutesList;