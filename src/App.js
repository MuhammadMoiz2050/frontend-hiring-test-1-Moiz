import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import Login from "./login.js"


function App() {
  return (
    // <div className="App">
    //   {/* app
    //   <button> <Link to="/cards">route</Link></button> */}
    // </div>
    <Login></Login>
  );
}

export default App;
