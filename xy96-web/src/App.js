import React from 'react';
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
//import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route 
            path="/login" 
            element={<Login />} />
        {/* Add other routes here, e.g., */}
        {/* <Route 
            path="/register" 
            element={<Register />} />   */}
        <Route
            exact
            path="/"
            element={<Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;