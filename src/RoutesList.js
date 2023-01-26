import { Route, Routes } from "react-router-dom";
import Homepage from "./Homepage.js";
import CompanyList from "./CompanyList.js";
import JobList from "./JobList.js";
import CompanyDetail from "./CompanyDetail.js";
import Login from "./Login.js";
import Signup from "./Signup.js";
import Profile from "./Profile.js";
import NotFound from "./NotFound.js";
import { Container } from "@mui/system";

/**
 * RoutesList: renders individual Route components
 * 
 * Props: N/A
 * 
 * State: N/A
 */
function RoutesList({ login, signup }) {

    //TODO: stuff here... hint: && using userContext
    return (
        <Container>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/companies" element={<CompanyList />} />
                <Route path="/jobs" element={<JobList />} />
                <Route path="/companies/:handle" element={<CompanyDetail />} />
                <Route path="/login" element={<Login login={login} />} />
                <Route path="/signup" element={<Signup signup={signup} />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Container>
    );
}


export default RoutesList;