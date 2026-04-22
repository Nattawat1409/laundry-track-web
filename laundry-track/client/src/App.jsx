import {useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Home from './pages/home.jsx';
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
import LandingPage from './pages/landingPage.jsx';
import './App.css' ;
import {Route , Routes} from 'react-router-dom';
import axios from 'axios';

// Navigation component
// define and intialize routing in each page 

const App = () => {

  return (
    <div>
      
      
      <Routes>
        <Route path="/" element = {<LandingPage />}/>
        <Route path="/login" element = {<Login />}/>
        <Route path="/register" element = {<Register />}/>
        <Route path="/home" element = {<Home />}/>
      </Routes>

    </div>
  );
}

export default App;
