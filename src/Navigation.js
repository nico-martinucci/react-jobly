import { NavLink } from "react-router-dom";

/**
 * Navigation: header navigation with link to homepage, Jobs, and Companies.
 * 
 * Props: N/A
 * 
 * State: N/A
 */
function Navigation() {

    return (
        <>
            <NavLink to="/">Jobly</NavLink>
            <NavLink to="/companies">Companies</NavLink>
            <NavLink to="/jobs">Jobs</NavLink>
        </>
    );
}


export default Navigation;