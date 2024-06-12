import React, { useContext, useRef, useState } from 'react'
import logo from './assets/images/logo.svg'
import profile from './assets/images/profile.jpg'
// const CustomButton = require()
import CustomButton from './components/CustomButton'
import Navbar from './components/Navbar.tsx'
// import { Route, createBrowserRouter, createRoutesFromElements, Link, Outlet, RouterProvider } from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Forum from './pages/forum.tsx'
import Home from './pages/home.tsx'
import Material from './pages/material.tsx'
import Profile from './pages/profile.tsx'
import VideoLearning from './pages/videolearning.tsx'
import Exercise from './pages/exercise.tsx'
import { AuthContext } from './context/AuthContext.tsx'
import { auth } from "./firebaseSetup";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { Button, Col, Form } from 'react-bootstrap'
import SignUp from './pages/signup.tsx'
import SignIn from './pages/signin.tsx'
// import './App.css'

function App() {
  // const navigate = useNavigate();
  // const user = useContext(AuthContext);
  // const [errorMsg, setErrorMsg] = useState("");

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const createAccount = async () => {
  //   navigate("/signup")
  // };

  // const signIn = async () => {
  //   try {
  //     await signInWithEmailAndPassword(auth,
  //       email,
  //       password
  //     );
  //     setErrorMsg("");
  //     setEmail("");
  //     setPassword("");
  //   } catch (error) {
  //     console.error(error);
  //     setErrorMsg((error as any).message.slice(10));
  //   }
  // };
  return (
  <main>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/forum" element={<Forum />} />
      <Route path="/material" element={<Material />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/videolearning" element={<VideoLearning />} />
      <Route path="/exercise" element={<Exercise />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  </Router>
  </main>
  )
} 

export default App
