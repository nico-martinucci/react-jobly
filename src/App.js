import logo from './logo.svg';
import { BrowserRouter } from "react-router-dom"
import './App.css';
import RoutesList from './RoutesList';
import Navigation from './Navigation';

/**
 * // TODO:
 * @returns 
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
