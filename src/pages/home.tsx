import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/images/logo.svg'
import profile from '../assets/images/profile.jpg'
import CustomButton from '../components/CustomButton.tsx'
import Navbar from '../components/Navbar.tsx'
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Forum from '../pages/forum.tsx'
import { AuthContext } from '../context/AuthContext'
import Footer from '../components/Footer.tsx'
import { auth, db } from '../firebaseSetup.ts'
import { ScaleLoader } from 'react-spinners'
import { doc, getDoc } from 'firebase/firestore'

const Home = () =>{
  const user = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [classData, setClassData] = useState<any>();
  const [hello, setHello] = useState("Hello");

  function shuffle(array: Array<any>) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }

  const helloMsg = [
    "Bonjour",
    "Bonjour",
    "Hola",
    "Nǐn hǎo",
    "Salve",
    "Zdravstvuyte",
    "Konnichiwa",
    "Konnichiwa",
    "Guten Tag",
    "Olá",
    "Annyeonghaseyo",
    "Annyeonghaseyo",
    "Hello",
    "Shalom",
    "God dag",
    "Namaste, Namaskar",
    "Hej",
    "Dzień dobry",
    "Namaskāra",
    "Salam",
    "Aloha",
  ];

  const getClassData = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, "datas", "class");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("Data does not exist in database!");
        return null;
      }
    } catch (e) {
      console.error("Error getting document:", e);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/signin", { state: { showToast: true } });
    }

    const shuffle = (array: any) => {
      let currentIndex = array.length;
      while (currentIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex],
        ];
      }
    };

    shuffle(helloMsg);

    let currentGreetingIndex = 0;
    let currentCharIndex = 0;
    let currentText = "";
    let doLooping = true;

    const interval = setInterval(() => {
      if (!doLooping) return;
      if (currentCharIndex < helloMsg[currentGreetingIndex].length) {
        currentText += helloMsg[currentGreetingIndex][currentCharIndex];
        setHello(currentText);
        currentCharIndex++;

      } else {
        doLooping = false;
        setTimeout(() => {
          currentText = "";
          currentCharIndex = 0;
          currentGreetingIndex = (currentGreetingIndex + 1) % helloMsg.length;
          doLooping = true;
        }, 4000);
      }
    }, 150);

    getClassData().then((data) => {
      if (data !== null) {
        setClassData(data);
      }
    });

    return () => clearInterval(interval);
  }, [navigate]);


  return (
    <main className="bg-[url('./assets/images/introduction.svg')] min-h-screen w-screen bg-cover flex flex-col">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-black">
          <ScaleLoader loading={loading} color="white" margin={5} height={35}/>
        </div>
      )}
      <Navbar active="home"/>
        <div className="mt-[5vh] mx-[10vh] mb-[15vh]">
          <div className="text-black text-4xl font-sans font-semibold">{hello}, {user?.userData.nama}</div>
          <div className="text-black text-lg mt-[3vh] font-sans">{classData?.introduction}</div>
        </div>
        <div className="bg-gradient-to-r from-orange-100 to-slate-400 w-screen py-[5vh] flex flex-grow">
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
              <div className="text-lg">{`Your latest GPS`}</div>
              <div className="text-sm">1st Semester:</div>
              <div className="text-3xl">{user?.userData?.ipk == 0 ? "NaN" : (Math.round(user?.userData.ipk ? user?.userData.ipk * 100 : 0) / 100).toFixed(2)}</div>
            </div>
            <div className="text-black bg-blue-300 w-[32vh] h-fit rounded-3xl text-center py-[0.5vh] shadow-xl">
              <div className="text-lg">Upcoming class</div>
              <div className="text-sm">{classData?.date}</div>
              <div className="text-lg">{classData?.title} | {classData?.room}</div>
            </div>  
          </div>
        </div>
      <Footer />
    </main>
  )
}

export default Home