import { Route, Routes } from "react-router-dom";
import Homepage from "./Homepage.js"
import CompanyList from "./CompanyList.js"
import JobList from "./JobList.js"
import CompanyDetail from "./CompanyDetail.js"
import NotFound from "./NotFound.js"

/**
 * RoutesList: renders individual Route components
 * 
 * Props: N/A
 * 
 * State: N/A
 */
function RoutesList() {

    return (
        <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/companies" element={<CompanyList />}></Route>
            <Route path="/jobs" element={<JobList />}></Route>
            <Route path="/companies/:handle" element={<CompanyDetail />}></Route>
            <Route path="*" element={<NotFound />}></Route>
        </Routes>
    )
}


export default RoutesList;