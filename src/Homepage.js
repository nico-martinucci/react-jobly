import { useContext } from "react";
import userContext from "./userContext";


function Homepage() {
    const { user } = useContext(userContext);
    return (
        <>
            {/* <h1>Homepage</h1> */}
            {(user) ?
                <p>Welcome {user.username}!</p> :
                // <p>Welcome to Jobly! Please hire me!</p>      
                <img 
                    style={{ display: "flex", justifyContent: "center" }} 
                    src="/jobly-low-resolution-logo-black-on-white-background.png" 
                />
            }
        </>
    );
}


export default Homepage;