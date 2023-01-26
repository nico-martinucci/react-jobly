import logo from './logo.svg';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import RoutesList from './RoutesList';
import Navigation from './Navigation';
import { useState, useEffect } from "react";
import userContext from "./userContext";
import JoblyApi from './api';

/**
 * App: it's an App! Parent component for entire Jobly application.
 */
function App() {
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState(null);
  const [token, setToken] = useState(null);

  //TODO: useEffect that checks for user in localStorage

  useEffect(function getUserData() {
    async function fetchUserDataFromApi() {
      const { username } = JSON.parse(atob(token.split(".")[1]));

      const { firstName, lastName, email, applications } = (await
        JoblyApi.fetchUserData(username));

      const newUser = { username, firstName, lastName, email };

      setUser(newUser);
      setApplications(applications);
    }

    if (token) {
      fetchUserDataFromApi();
    }
  }, [token])

  /** 
   * login function makes api call to "/auth/token" to retrieve token. If call 
   * is successful calls getUserAndJobs. If not successful, return false so that
   * page doesn't redirect.
   */
  async function login(data) {
    const newToken = await JoblyApi.loginUser(data);

    if (newToken) {
      // getUserAndJobs(data.username);
      setToken(newToken);
      return true;
    } else {
      return false;
    }
  }

  /** 
   * signup function makes api call to "/auth/register" to retrieve token. If 
   * call is successful calls getUserAndJobs. If not successful, return false 
   * so that page doesn't redirect. 
   */
  async function signup(data) {
    const newToken = await JoblyApi.signupUser(data);

    if (newToken) {
      // getUserAndJobs(data.username);
      setToken(newToken);
      return true;
    } else {
      return false;
    }
  }

  /**function that takes in username and token and makes a call to the 
   * users/:username endpoint. sets user based off of response. sets 
   * applications based off of response
    */
  // async function getUserAndJobs(username) {
  //   const { firstName, lastName, email, applications } = (await
  //     JoblyApi.fetchUserData(username));

  //   const newUser = { username, firstName, lastName, email };

  //   setUser(newUser);
  //   setApplications(applications);
  // }
  console.log("state of user", user);

  /**
   * function that sets user to null, removes JoblyApi token, effectively 
   * logging them out from the application
   */
  function logout() {
    JoblyApi.token = "";
    setUser(null);
    // TODO: remove token from local storage
  }

  //TODO: register/login -> recieve a token -> effect takes the username that was 
  //submitted and the token that was provided and makes another call to the 
  // "/users/:username" endpoint. Then user is set to what is recieved, spread,
  //and token appended

  return (
    <div className='App'>
      <userContext.Provider value={{ user, applications }}>
        <BrowserRouter>
          <Navigation logout={logout} />
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
