import logo from './logo.svg';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import RoutesList from './RoutesList';
import Navigation from './Navigation';
import { useState } from "react";
import userContext from "./userContext";
import JoblyApi from './api';

/**
 * App: it's an App! Parent component for entire Jobly application.
 */
function App() {
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState(null);

  //TODO: useEffect that checks for user in localStorage

  //TODO: login function that is passed down that makes api call to get token 
  //and then sets user 

  /** 
   * login function makes api call to "/auth/token" to retrieve token. Makes 
   * second call to "/users/:username" get user info using that token and 
   * username. sets user using that information.
   */
  async function login(data) {
    const token = await JoblyApi.loginUser(data);
    const username = data.username;
    getUserAndJobs(username, token);

  }

  /** 
   * signup function makes api call to "/auth/register" to retrieve token. Makes 
   * second call to "/users/:username" get user info using that token and 
   * username. sets user using that information.
   */
  async function signup(data) {
    const token = await JoblyApi.signupUser(data);
    const username = data.username;
    getUserAndJobs(username, token);
  }

  /**function that takes in username and token and makes a call to the 
   * users/:username endpoint. sets user based off of response. sets 
   * applications based off of response
    */
  async function getUserAndJobs(username, token) {
    const { firstName, lastName, email, applications } = (await
      JoblyApi.fetchUserData(username, token));

    const newUser = { username, firstName, lastName, email };

    setUser(newUser);
    setApplications(applications);

  }
  console.log("state of user", user);


  //TODO: Signup function that is passed down that makes api call to get token and
  //also creates a user in database and sets user to corresponding user

  //TODO: logout function that is passed down that clears localStorage and sets user 
  //to null

  //TODO: register/login -> recieve a token -> effect takes the username that was 
  //submitted and the token that was provided and makes another call to the 
  // "/users/:username" endpoint. Then user is set to what is recieved, spread,
  //and token appended

  return (
    <div className='App'>
      <userContext.Provider value={{ user, applications }}>
        <BrowserRouter>
          <Navigation />
          <RoutesList login={login} signup={signup} />
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;

// return (
//   <div className='App'>
//     <userContext.Provider value={user}>
//       <BrowserRouter>
//         <Navigation logout={logout}/>
//         <RoutesList signup={signup} login={login}/>
//       </BrowserRouter>
//     </userContext.Provider>
//   </div>
// );
