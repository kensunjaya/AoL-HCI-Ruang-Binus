import React, { useState } from 'react'
import logo from './assets/images/logo.svg'
import profile from './assets/images/profile.jpg'
// const CustomButton = require()
import CustomButton from './components/CustomButton.tsx'
import Navbar from './components/Navbar.tsx'
// import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <main className="bg-[url('./assets/images/introduction.svg')] to-slate-400 min-h-screen w-screen bg-cover">
      <Navbar />
      <div className="mt-[5vh] mx-[10vh] mb-[15vh]">
        <div className="text-black text-4xl">Introduction</div>
        <div className="text-black text-lg mt-[3vh]">RuangBinus is an innovative platform designed specifically for students to access and learn course materials effectively. With various features provided, RuangBinus allows students to access lecture materials online, whether in text, video, or audio format. Additionally, the platform offers a variety of learning aids such as interactive quizzes, discussion forums, and additional tutorials, which can help students better understand the material. With the convenience of access and flexibility offered, RuangBinus serves as a valuable tool for students to enhance their understanding of course materials.</div>
      </div>
      <div className="bg-gradient-to-r from-orange-100 to-slate-400 min-w-screen min-h-screen py-[5vh] flex">
        <div className="mx-[10vh] w-full h-fit flex">
          <img src={profile} className="w-[20vh] h-[20vh] bg-white rounded-full" />
          <div className="text-black my-auto mx-[3vh]">
            <div className="font-semibold text-3xl">Gauss Seidel</div>
            <div className="text-xl">Binusian 2027</div>
            <div className="font-mono text-xl">2702273315</div>
          </div>
        </div>
        <div className="justify-end mx-[10vh]">
          <div className="text-black bg-blue-300 w-[32vh] h-[8vh] rounded-3xl text-center py-[0.5vh] mb-[4vh]">
            <div className="text-lg">Your Last Exam Score</div>
            <div className="text-sm">Semester 1:</div>
            <div className="text-3xl">4.00</div>
          </div>
          <div className="text-black bg-blue-300 w-[32vh] h-[8vh] rounded-3xl text-center py-[0.5vh]">
            <div className="text-lg">Upcoming class</div>
            <div className="text-sm">Monday, 10 June 2024</div>
            <div className="text-xl">{"Major\t|\t1001"}</div>
          </div>
        </div>
      </div>
      
    </main>
  )
} 

export default App
