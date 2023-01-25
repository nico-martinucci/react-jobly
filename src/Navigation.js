import { NavLink } from "react-router-dom";

/**
 * 
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