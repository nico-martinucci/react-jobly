import logo from './logo.svg';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import RoutesList from './RoutesList';
import Navigation from './Navigation';
import { useState, useEffect, forwardRef } from "react";
import userContext from "./userContext";
import JoblyApi from './api';
import { TextField, Button, LinearProgress } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import jwt_decode from "jwt-decode";

/**
 * App: it's an App! Parent component for entire Jobly application.
 */
function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("joblyToken"));
  const [toast, setToast] = useState({ open: false, msg: null });
  const [isLoading, setIsLoading] = useState(true);


  /**
   * effect triggered on change of token state. Checks localStorage for token. 
   * If token exists then setToken, triggering other useEffect
   */
  useEffect(function getUserData() {
    async function fetchUserDataFromApi() {

      JoblyApi.token = token;
      const { username } = jwt_decode(token);

      try {

        const { firstName, lastName, email, applications } = (await
          JoblyApi.fetchUserData(username));

        const newUser = { username, firstName, lastName, email, applications };

        setUser(newUser);
      } catch (err) {

        setToast({ open: true, msg: err[0] });
      } finally {
        setIsLoading(false);
      }
    }
    if (token) {
      fetchUserDataFromApi();
      localStorage.setItem("joblyToken", token);
    }
    else {
      setIsLoading(false);
    }
  }, [token]);


  /** 
   * login function makes api call to "/auth/token" to retrieve token. If call 
   * is successful calls getUserAndJobs. If not successful, return false so that
   * page doesn't redirect.
   */
  async function login(data) {
    const newToken = await JoblyApi.loginUser(data);
    setToken(newToken);
  }

  /** 
   * signup function makes api call to "/auth/register" to retrieve token. If 
   * call is successful calls getUserAndJobs. If not successful, return false 
   * so that page doesn't redirect. 
   */
  async function signup(data) {
    const newToken = await JoblyApi.signupUser(data);
    setToken(newToken);
  }

  /** 
 * updateProfile function makes api call to "/users/:username".
 */
  async function updateProfile(data) {
    const { username, firstName, lastName, email } = (await 
      JoblyApi.updateUser(data));

    setUser(curr => ({
      username, 
      firstName, 
      lastName, 
      email,
      applications: curr.applications
    }));
  }

  /**
   * function that sets user to null, removes JoblyApi token, effectively 
   * logging them out from the application
   */
  function logout() {
    JoblyApi.token = "";
    setUser(null);
    setToken(null);
    localStorage.removeItem('joblyToken');
  }
  
  /**
   * applyToJob function that sends the id of cliked-on job to the server and
   * "applies" the current user to that job. updates user state accordingly.
   */
  async function applyToJob(jobId) {
    const appliedJobId = await JoblyApi.sendApplicationRequest({
      jobId, 
      username: user.username
    });

    setUser(curr => ({
      ...curr,
      applications: [...curr.applications, appliedJobId]
    }))
  }

  /******** SNACKBAR START *******/

  /** resets the snackbar when closed*/
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

  if (isLoading) return <p><LinearProgress /></p>;

  return (
    <div className='App'>
      <userContext.Provider value={{ user }}>
        <BrowserRouter>
          <Navigation logout={logout} />
          <RoutesList 
            login={login} 
            signup={signup} 
            updateProfile={updateProfile} 
            applyToJob={applyToJob}
          />
        </BrowserRouter>
      </userContext.Provider>
      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleClose} >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {toast.msg}
        </Alert>
      </Snackbar>
    </div>
  );
};

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
