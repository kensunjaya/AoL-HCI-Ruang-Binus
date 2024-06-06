import React, { useState } from 'react'
import logo from './assets/images/logo.svg'
import profile from './assets/images/profile.jpg'
// const CustomButton = require()
import CustomButton from './components/CustomButton.tsx'
import Navbar from './components/Navbar.tsx'
// import { Route, createBrowserRouter, createRoutesFromElements, Link, Outlet, RouterProvider } from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Forum from './pages/forum.tsx'
import Home from './pages/home.tsx'
import Material from './pages/material.tsx'
import Profile from './pages/profile.tsx'
import VideoLearning from './pages/videolearning.tsx'
import Exercise from './pages/exercise.tsx'
// import './App.css'

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/forum" element={<Forum />} />
      <Route path="/material" element={<Material />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/videolearning" element={<VideoLearning />} />
      <Route path="/exercise" element={<Exercise />} />
    </Routes>
  </Router>
  )
} 

export default App
