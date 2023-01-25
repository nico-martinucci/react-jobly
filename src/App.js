import logo from './logo.svg';
import { BrowserRouter } from "react-router-dom"
import './App.css';
import RoutesList from './RoutesList';
import Navigation from './Navigation';

/**
 * App: it's an App! Parent component for entire Jobly application.
 */
function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <RoutesList />
      </BrowserRouter>
    </>
  );
}

export default App;
