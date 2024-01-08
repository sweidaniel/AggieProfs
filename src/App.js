import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfessorPage from './components/Professor'; 
import {CSVDataProvider} from './components/CSVFile'; 
import Course from './components/Course';

function App() {

  return (
    <CSVDataProvider>
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <SearchBar />
              </div>
            }
          />
          <Route path="/professors/:id" element={<ProfessorPage />} />
          <Route path="/courses/:courseName" element={<Course />} />
          {/* Add other routes as needed */}
        </Routes>
        <Footer />
      </Router>
    </div>
    </CSVDataProvider>
  );
}

export default App;
