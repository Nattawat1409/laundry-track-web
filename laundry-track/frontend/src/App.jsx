import Home from './pages/home.jsx'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import LandingPage from './pages/landingPage.jsx'
import './App.css' 
import {Route , Routes} from 'react-router-dom'
// Navigation component
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
