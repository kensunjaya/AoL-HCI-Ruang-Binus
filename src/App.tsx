import React, { useState } from 'react'
import logo from './assets/images/logo.svg'
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
      <div className="bg-gradient-to-r from-orange-100 to-slate-400 h-full min-w-screen py-[5vh]">
        <div className="mx-[10vh] border flex">
          <div className="w-[20vh] h-[20vh] bg-white rounded-full" />
          <div className="text-black">
            <div>Kenneth Sunjaya</div>
            <div>Binusian 2027</div>
            <div>2702273315</div>
          </div>
        </div>
      </div>
    </main>
  )
} 

export default App
