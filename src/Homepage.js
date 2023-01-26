import { useContext } from "react";
import userContext from "./userContext";

function Homepage() {
    const { user } = useContext(userContext);
    return (
        <>
            <h1>Homepage</h1>
            {(user) ?
                <p>Welcome Back {user.username}!</p> :
                <p>Welcome to Jobly! Please hire me!</p>}
        </>
    );
}


export default Homepage;