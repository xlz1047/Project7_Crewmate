import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateCrewmate from './components/CreateCrewmate';
import CrewmateGallery from './components/CrewmateGallery';
import CrewmateDetails from './components/CrewmateDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Welcome to the Crewmate Creator!</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/create">Create a Crewmate</Link>
            <Link to="/gallery">Crewmate Gallery</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateCrewmate />} />
          <Route path="/gallery" element={<CrewmateGallery />} />
          <Route path="/crewmate/:id" element={<CrewmateDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <p>Here is where you can create your very own set of crewmates before sending them off into space!</p>
  </div>
);

export default App;
