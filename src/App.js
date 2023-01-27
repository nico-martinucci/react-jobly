import logo from './logo.svg';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import RoutesList from './RoutesList';
import Navigation from './Navigation';
import { useState, useEffect, forwardRef } from "react";
import userContext from "./userContext";
import JoblyApi from './api';
import { TextField, Button } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import jwt_decode from "jwt-decode";

/**
 * App: it's an App! Parent component for entire Jobly application.
 */
function App() {
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState(null);
  const [token, setToken] = useState(null);
  const [toast, setToast] = useState({ open: false, msg: null });

  //TODO: useEffect that checks for user in localStorage (listen for token)

  /**effect triggered on mount. Checks localStorage for token. If token exists
   * then setToken, triggering other useEffect
   */
  useEffect(function checkForLocalToken() {

    const localToken = localStorage.getItem("joblyToken");
    if (localToken) {
      setToken(localToken);
    }

  }, []);

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

        const newUser = { username, firstName, lastName, email };

        setUser(newUser);
        setApplications(applications);
      } catch (err) {

        setToast({ open: true, msg: err[0] });
      }
    }
    if (token) {
      fetchUserDataFromApi();
      localStorage.setItem("joblyToken", token);
    } else {
      localStorage.removeItem("joblyToken");
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


  console.log("state of user in APP", user);

  /**
   * function that sets user to null, removes JoblyApi token, effectively 
   * logging them out from the application
   */
  function logout() {
    // TODO: revist the need for this once we have code to sync up local storage
    // with our token state
    JoblyApi.token = "";
    setUser(null);
    setToken(null);
    localStorage.removeItem('joblyToken');

    // TODO: remove token from local storage
  }

  //TODO: register/login -> recieve a token -> effect takes the username that was 
  //submitted and the token that was provided and makes another call to the 
  // "/users/:username" endpoint. Then user is set to what is recieved, spread,
  //and token appended

  /******** SNACKBAR START *******/

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setToast({ open: false, msg: null });
  };

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  /********* SNACKBAR END *******/

  return (
    <div className='App'>
      <userContext.Provider value={{ user, applications }}>
        <BrowserRouter>
          <Navigation logout={logout} />
          <RoutesList login={login} signup={signup} />
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
