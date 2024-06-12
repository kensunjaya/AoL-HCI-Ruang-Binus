import { useState } from "react";
import Navbar from "../components/Navbar";
import dropdown from "../assets/images/dropdown.png";
import collapse from "../assets/images/collapse.png";
import progress0 from "../assets/images/progress0.png";

const Exercise = () =>{
  const [option, setOption] = useState("course");
  const [open, setOpen] = useState(null);

  const exerciseData = {
    course: [
      {
        title: " Algorithm and Programming",
        content: [
          "Variable and Data Type",
          "Operators",
          "control Structures",
          "Function",
          "Arrays",
        ]
      },
      {
        title: " Program Design Methods",
        content: [
          "Class Diagram",
          "ERD",
          "Pseudocode",
          "Flowchart",
        ]
      },
      {
        title: " Basic Statistic",
        content: [
          "Regression",
          "Hypothesis Testing",
          "Correlation",
          "Descriptive Statistics",
        ]
      },
      {
        title: " Character Building: Pancasila",
        content: [
          "Pancasila",
          "Character Building",
        ]
      },
      {
        title: " Discrete Mathematics",
        content: [
          "Set",
          "Function",
          "Relation",
          "Graph Theory", 
        ]
      },
      {
        title: " Indonesian",
        content: [
          "Teks Ilmiah",
          "Puisi",
          "Novel",
        ]
      }
    ],
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-orange-100 to-slate-400">
      <Navbar active="exercise"/>
      <div className="flex m-[3vh]">
          <div className="h-fit w-fit m-[5vh] rounded-3xl">
            {exerciseData[option as keyof typeof exerciseData].map((data: any) => (
              <div key={data.title} className="mb-[3vh] border border-black rounded-3xl bg-graystitle">
                <button className="bg-graystitle h-fit w-[76vw] rounded-3xl p-[3vh] flex text-left items-center" onClick={() => setOpen(open === data.title ? null : data.title)}>
                  <img src={progress0} className="w-[12vh] h-[6vh]" />
                  <div className="font-semibold w-full text-black text-3xl ml-[2vh]">{data.title}</div>
                  <div className="w-full justify-end items-center flex">
                    { open === data.title ? <img src={collapse} alt="^" className="h-auto w-[5%]" /> : <img src={dropdown} alt="v" className="h-auto w-[5%]" /> }
                  </div>
                </button>
                {open === data.title && (
                  <div>
                    {data.content.map((item: string, index: number) => (
                      <>
                      <div className="text-black mx-[3vh] my-[1vh]">
                      <a href="https://en.wikipedia.org/wiki/React_(JavaScript_library)" key={index} className="text-black">
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
  );
}

export default Exercise