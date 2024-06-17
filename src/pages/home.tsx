import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/images/logo.svg'
import profile from '../assets/images/profile.jpg'
import CustomButton from '../components/CustomButton.tsx'
import Navbar from '../components/Navbar.tsx'
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Forum from '../pages/forum.tsx'
import { AuthContext } from '../context/AuthContext'
import Footer from '../components/Footer.tsx'

const Home = () =>{
  const user = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => { // render sebelum return (hanya 1x)
    console.log(user?.userData);
    if (!user?.user) {
      navigate("/signin");
    }
  }, []);

  return (
    <main className="bg-[url('./assets/images/introduction.svg')] min-h-screen w-screen bg-cover flex flex-col">
      <Navbar active="home"/>
      <div className="mt-[5vh] mx-[10vh] mb-[15vh]">
        <div className="text-black text-4xl font-sans font-semibold">Introduction</div>
        <div className="text-black text-lg mt-[3vh] font-sans">RuangBinus is an innovative platform designed specifically for students to access and learn course materials effectively. With various features provided, RuangBinus allows students to access lecture materials online, whether in text, video, or audio format. Additionally, the platform offers a variety of learning aids such as interactive quizzes, discussion forums, and additional tutorials, which can help students better understand the material. With the convenience of access and flexibility offered, RuangBinus serves as a valuable tool for students to enhance their understanding of course materials.</div>
      </div>
      <div className="bg-gradient-to-r from-orange-100 to-slate-400 min-w-screen h-[60vh] py-[5vh] flex">
        <div className="mx-[10vh] w-full h-fit flex">
          <img src={profile} className="w-[20vh] h-[20vh] bg-white rounded-full" />
          <div className="text-black my-auto mx-[3vh]">
            <div className="font-semibold text-3xl font-sans">{user?.userData.nama}</div>
            <div className="text-xl font-sans">{`Binusian 20${user?.userData.nim.slice(0, 2)}`}</div>
            <div className="font-mono text-xl">{user?.userData.nim}</div>
          </div>
        </div>
        <div className="justify-end mx-[10vh] font-sans">
          <div className="text-black bg-blue-300 w-[32vh] h-fit rounded-3xl text-center py-[0.5vh] mb-[4vh] shadow-xl">
            <div className="text-lg">Your Last Exam Score</div>
            <div className="text-sm">Semester 1:</div>
            <div className="text-3xl">{user?.userData?.ipk == 0 ? "NaN" : (Math.round(user?.userData.ipk ? user?.userData.ipk * 100 : 0) / 100).toFixed(2)}</div>
          </div>
          <div className="text-black bg-blue-300 w-[32vh] h-fit rounded-3xl text-center py-[0.5vh] shadow-xl">
            <div className="text-lg">Upcoming class</div>
            <div className="text-sm">Monday, 17 June 2024</div>
            <div className="text-xl">{"Major\t|\t1001"}</div>
          </div>  
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default Home