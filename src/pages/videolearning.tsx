import { useState } from "react";
import CustomButton from "../components/CustomButton";
import Navbar from "../components/Navbar";
import dropdown from "../assets/images/dropdown.png";
import collapse from "../assets/images/collapse.png";

const VideoLearning = () => {
  const [option, setOption] = useState("algo");
  const [open, setOpen] = useState(null);

  const vblData = {
    algo: [
      {
        title: "Variables and Data Type",
        content: [
          "Defining a variable",
          "Initializing a variable"
        ]
      },
      {
        title: "Operators",
        content: [
          "Arithmetic operators",
          "Relational operators",
          "Logical operators"
        ]
      },
      {
        title: "Control Structures",
        content: [
          "If-else",
          "Switch-case",
          "For loop",
          "While loop"
        ]
      },
      {
        title: "Function",
        content: [
          "Defining a function",
          "Calling a function"
        ]
      }
    ],
    pdm: [
      {
        title: "Class Diagram",
        content: [
          "What is class diagram",
          "How to create a class diagram"
        ]
      },
      {
        title: "ERD",
        content: [
          "What is ERD",
          "How to create an ERD"
        ]
      },
      {
        title: "Pseudocode",
        content: [
          "What is pseudocode",
          "How to write pseudocode"
        ]
      }
    ],
    bastat: [
      {
        title: "Regression",
        content: [
          "Simple linear regression",
          "Multiple linear regression"
        ]
      },
      {
        title: "Hypothesis Testing",
        content: [
          "What is hypothesis testing",
          "How to do hypothesis testing"
        ]
      },
      {
        title: "Correlation",
        content: [
          "What is correlation",
          "How to calculate correlation"
        ]
      }
    ],
    cb: [
      {
        title: "Pancasila",
        content: [
          "Silaturahmi",
          "Gotong royong",
          "Kerja keras",
          "Disiplin"
        ]
      }
    ],
    discrete: [
      {
        title: "Set",
        content: [
          "What is set",
          "Operation in set"
        ]
      },
      {
        title: "Function",
        content: [
          "What is function",
          "Operation in function"
        ]
      },
      {
        title: "Relation",
        content: [
          "What is relation",
          "Operation in relation"
        ]
      }
    ],
    indo: [
      {
        title: "Teks ilmiah",
        content: [
          "Cara membuat teks ilmiah",
        ]
      }
    ],
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-orange-100 to-slate-400 font-sans">
      <Navbar />
      <div className="flex m-[3vh]">
        <div className="w-fit h-fit bg-blue-950 items-center text-center rounded-3xl px-[2vh] mt-[5vh]">
          <div className="text-4xl my-6">Kategori</div>
          <CustomButton title="Algorithm and Programming" style={`${option === "algo" ? "bg-green-600" : "bg-bluepale"} w-[35vh] text-white mb-6 mt-3`} onClick={() => setOption("algo")} />
          <br />
          <CustomButton title="Program Design Methods" style={`${option === "pdm" ? "bg-green-600" : "bg-bluepale"} w-[35vh] text-white mb-6`} onClick={() => setOption("pdm")} />
          <br />
          <CustomButton title="Basic Statistics" style={`${option === "bastat" ? "bg-green-600" : "bg-bluepale"} w-[35vh] text-white mb-6`} onClick={() => setOption("bastat")} />
          <br />
          <CustomButton title="Character Building: Pancasila" style={`${option === "cb" ? "bg-green-600" : "bg-bluepale"} w-[35vh] text-white mb-6`} onClick={() => setOption("cb")} />
          <br />
          <CustomButton title="Discrete Mathematics" style={`${option === "discrete" ? "bg-green-600" : "bg-bluepale"} w-[35vh] text-white mb-6`} onClick={() => setOption("discrete")} />
          <br />
          <CustomButton title="Indonesian" style={`${option === "indo" ? "bg-green-600" : "bg-bluepale"} w-[35vh] text-white mb-6`} onClick={() => setOption("indo")} />
        </div>
        <div>
          <div className="h-fit w-fit m-[5vh] rounded-3xl">
            {vblData[option as keyof typeof vblData].map((data: any) => (
              <div key={data.title} className="mb-[3vh] border border-black rounded-3xl bg-graystitle">
                <button className="bg-graystitle h-fit w-[76vw] rounded-3xl p-[3vh] flex text-left" onClick={() => setOpen(open === data.title ? null : data.title)}>
                  <div className="font-semibold w-full text-black text-3xl">{data.title}</div>
                  <div className="w-full justify-end items-center flex">
                    { open === data.title ? <img src={collapse} alt="^" className="h-auto w-[5%]" /> : <img src={dropdown} alt="v" className="h-auto w-[5%]" /> }
                  </div>
                </button>
                {open === data.title && (
                  <div>
                    {data.content.map((item: string, index: number) => (
                      <>
                      <div className="text-black mx-[3vh] my-[1vh]">
                      <a href="https://youtu.be/tDk4YhKmqI8?si=7Tnj8-zwA0XQ6Vsh" key={index} className="text-black">
                        {index + 1}. {item}
                      </a>
                      </div>
                      </>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoLearning;
