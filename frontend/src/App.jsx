import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Adopt from './pages/Adopt';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import WebLayout from './layout/WebLayout';
import Login from './components/Login';
import Signup from './components/Signup';



function App() {
  return (
    <Router>      
          <Routes>
          <Route element={<WebLayout/>}/>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/adopt" element={<Adopt />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
    </Router>
  );
}

export default App;
