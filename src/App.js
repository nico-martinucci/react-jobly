import logo from './logo.svg';
import { BrowserRouter } from "react-router-dom";
import './App.css';
import RoutesList from './RoutesList';
import Navigation from './Navigation';
import { useState } from react;
import userContext from "./userContext";

/**
 * App: it's an App! Parent component for entire Jobly application.
 */
function App() {
  const [user, setUser] = useState(null);

  //TODO: useEffect that checks for user in localStorage

  //TODO: login function that is passed down that makes api call to get token 
  //and then sets user 

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
      <userContext.Provider value={user}>
        <BrowserRouter>
          <Navigation />
          <RoutesList />
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
