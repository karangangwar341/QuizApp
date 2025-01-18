import { useState } from 'react'
import './App.css'
import LandingPage from './pages/LandingPage'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Quiz from './pages/Quiz'
import Results from './pages/Results'

function App() {
  return (
    <Router>
<Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/quiz" element={<Quiz />} />
  <Route path="/result" element={<Results/>} />
  
</Routes>
    </Router>
 
  )
}

export default App
