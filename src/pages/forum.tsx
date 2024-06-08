import { useState } from "react";
import CustomButton from "../components/CustomButton";
import Navbar from "../components/Navbar";

const Forum = () =>{

  const [forum, setForum] = useState("algo");

  const forumData = {
    algo: [
    {
      nama: "Kenneth Sunjaya",
      title: "How to use looping?",
      date: "27 Februari 2024",
      category: "Repetition",
    },
    {
      nama: "Felix Natan Lim",
      title: "How to use conditional statement?",
      date: "22 Februari 2024",
      category: "Selection",
    },
    {
      nama: "Frederick Krisna",
      title: "What's the difference between string and char?",
      date: "20 Januari 2024",
      category: "Data type",
    },
    {
      nama: "Felix Natan Lim",
      title: "How to use scanf properly?",
      date: "08 Januari 2024",
      category: "Input & Output",
    }],
    pdm: [
      {
        nama: "Kenneth Sunjaya",
        title: "How to create Class Diagram?",
        date: "17 Februari 2024",
        category: "Class Diagram",
      },
      {
        nama: "Frederick Krisna",
        title: "What is ERD?",
        date: "10 Februari 2024",
        category: "Relational Diagram",
      },
      {
        nama: "Chris Bernard",
        title: "How to write pseudocode properly?",
        date: "02 Februari 2024",
        category: "Pseudocode",
      }],
    bastat: [
      {
        nama: "Joannes Jason Sutisna",
        title: "How to create a simple linear regression model?",
        date: "06 Maret 2024",
        category: "Regression",
      },
      {
        nama: "Kenneth Sunjaya",
        title: "An example of two-tailed test problem",
        date: "01 Maret 2024",
        category: "Data Analysis",
      },
      {
        nama: "Chris Bernard",
        title: "Normal distribution problem",
        date: "15 Februari 2024",
        category: "Data Distribution",
      },
      {
        nama: "Miguel",
        title: "What is Bayes Theorem?",
        date: "09 Februari 2024",
        category: "Probability",
      },
    ],
    cb: [
      {
        nama: "Miguel",
        title: "How the proclamation of Indonesian independence was carried out?",
        date: "22 Januari 2024",
        category: "History",
      },
    ],
    discrete: [
      {
        nama: "Kenneth Sunjaya",
        title: "What's the advantages of using Prim's Algorithm over Kruskal?",
        date: "19 April 2024",
        category: "Graph",
      },
      {
        nama: "Kenneth Sunjaya",
        title: "How to create an adjacency matrix?",
        date: "15 April 2024",
        category: "Graph",
      },
      {
        nama: "Frederick Krisna",
        title: "What is hamilton path?",
        date: "11 April 2024",
        category: "Graph",
      },
      {
        nama: "Frederick Krisna",
        title: "What's the difference between tree and forest?",
        date: "11 April 2024",
        category: "Tree",
      },
      {
        nama: "Felix Natan Lim",
        title: "How to count edges based on given vertices on graph?",
        date: "08 April 2024",
        category: "Graph",
      },
    ],
    indo: [
      {
        nama: "Joannes Jason Sutisna",
        title: "What are the rules in writing academic paragraph?",
        date: "10 Februari 2024",
        category: "Text",
      },
    ],

  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-orange-100 to-slate-400">
      <Navbar />
      <div className="flex m-[3vh]">
        <div className="w-fit h-fit bg-blue-950 items-center text-center rounded-3xl px-[2vh] mt-[5vh]">
          <div className="text-5xl my-6">Kategori</div>
            <CustomButton title="Algorithm and Programming" style={`${forum === "algo" ? "bg-green-600" : "bg-blue-700"} w-[30vh] font-semibold text-white mb-6 mt-3`} onClick={() => setForum("algo")}/>
            <br />
            <CustomButton title="Program Design Methods" style={`${forum === "pdm" ? "bg-green-600" : "bg-blue-700"} w-[30vh] font-semibold text-white mb-6`} onClick={() => setForum("pdm")}/>
            <br />
            <CustomButton title="Basic Statistics" style={`${forum === "bastat" ? "bg-green-600" : "bg-blue-700"} w-[30vh] font-semibold text-white mb-6`} onClick={() => setForum("bastat")}/>
            <br />
            <CustomButton title="Character Building: Pancasila" style={`${forum === "cb" ? "bg-green-600" : "bg-blue-700"} w-[30vh] font-semibold text-white mb-6`} onClick={() => setForum("cb")}/>
            <br />
            <CustomButton title="Discrete Mathematics" style={`${forum === "discrete" ? "bg-green-600" : "bg-blue-700"} w-[30vh] font-semibold text-white mb-6`} onClick={() => setForum("discrete")}/>
            <br />
            <CustomButton title="Indonesian" style={`${forum === "indo" ? "bg-green-600" : "bg-blue-700"} w-[30vh] font-semibold text-white mb-6`} onClick={() => setForum("indo")}/>
          </div>
        <div>
          <div className="bg-lightpurple h-fit w-[76vw] m-[5vh] rounded-[3vh] p-[3vh]">
            <div className="font-bold text-3xl">{"Forum Diskusi"}</div>
            {forumData[forum as keyof typeof forumData].map((data : any) => {
            return (
              <div className="bg-blue-100 h-fit w-full mx-auto my-[3vh] rounded-[3vh] p-[3vh]">
                <div className="font-bold text-3xl text-black">{data.title}</div>
                <div className="text-lg text-black">{data.nama} - {data.date}</div>
                <div className="text-lg text-black">{data.category}</div>
              </div>
            )
          })}
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Forum