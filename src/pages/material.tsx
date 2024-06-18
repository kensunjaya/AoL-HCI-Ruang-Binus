import { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import Navbar from "../components/Navbar";
import dropdown from "../assets/images/dropdown.png";
import collapse from "../assets/images/collapse.png";
import { useNavigate } from "react-router";
import { auth } from "../firebaseSetup";
import Footer from "../components/Footer";

const Material = () => {
  const [option, setOption] = useState("algo");
  const [open, setOpen] = useState(null);

  const navigate = useNavigate();

  useEffect(() => { // render sebelum return (hanya 1x)
    if (!auth.currentUser) {
      navigate("/signin", { state: { showToast: true } });
    }
  }, []);


  const materialData = {
    algo: [
      {
        title: "Variables and Data Type",
        content: [
          "Defining a variable",
          "Initializing a variable",
          "Data types in programming",
          "Type conversion"
        ]
      },
      {
        title: "Operators",
        content: [
          "Arithmetic operators",
          "Relational operators",
          "Logical operators",
          "Assignment operators",
          "Bitwise operators"
        ]
      },
      {
        title: "Control Structures",
        content: [
          "If-else",
          "Switch-case",
          "For loop",
          "While loop",
          "Do-while loop"
        ]
      },
      {
        title: "Function",
        content: [
          "Defining a function",
          "Calling a function",
          "Function parameters",
          "Return values",
          "Recursive functions"
        ]
      },
      {
        title: "Arrays",
        content: [
          "Defining an array",
          "Accessing array elements",
          "Multidimensional arrays",
          "Array methods"
        ]
      }
    ],
    pdm: [
      {
        title: "Class Diagram",
        content: [
          "What is class diagram",
          "How to create a class diagram",
          "UML basics",
          "Associations in class diagrams"
        ]
      },
      {
        title: "ERD",
        content: [
          "What is ERD",
          "How to create an ERD",
          "Entities and relationships",
          "Attributes and keys"
        ]
      },
      {
        title: "Pseudocode",
        content: [
          "What is pseudocode",
          "How to write pseudocode",
          "Pseudocode conventions",
          "Converting pseudocode to code"
        ]
      },
      {
        title: "Flowchart",
        content: [
          "What is a flowchart",
          "Flowchart symbols",
          "Creating a flowchart",
          "Advantages of using flowcharts"
        ]
      }
    ],
    bastat: [
      {
        title: "Regression",
        content: [
          "Simple linear regression",
          "Multiple linear regression",
          "Interpreting regression results",
          "Regression assumptions"
        ]
      },
      {
        title: "Hypothesis Testing",
        content: [
          "What is hypothesis testing",
          "How to do hypothesis testing",
          "Types of hypotheses",
          "P-values and significance levels"
        ]
      },
      {
        title: "Correlation",
        content: [
          "What is correlation",
          "How to calculate correlation",
          "Interpreting correlation coefficients",
          "Correlation vs. causation"
        ]
      },
      {
        title: "Descriptive Statistics",
        content: [
          "Measures of central tendency",
          "Measures of dispersion",
          "Data visualization techniques",
          "Summarizing data"
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
          "Disiplin",
          "Tanggung jawab"
        ]
      },
      {
        title: "Character Building",
        content: [
          "Integrity",
          "Empathy",
          "Respect",
          "Responsibility",
          "Courage"
        ]
      }
    ],
    discrete: [
      {
        title: "Set",
        content: [
          "What is set",
          "Operation in set",
          "Venn diagrams",
          "Applications of set theory"
        ]
      },
      {
        title: "Function",
        content: [
          "What is function",
          "Operation in function",
          "Types of functions",
          "Inverse functions"
        ]
      },
      {
        title: "Relation",
        content: [
          "What is relation",
          "Operation in relation",
          "Properties of relations",
          "Equivalence relations"
        ]
      },
      {
        title: "Graph Theory",
        content: [
          "What is a graph",
          "Types of graphs",
          "Graph traversal algorithms",
          "Applications of graph theory"
        ]
      }
    ],
    indo: [
      {
        title: "Teks ilmiah",
        content: [
          "Cara membuat teks ilmiah",
          "Struktur teks ilmiah",
          "Kaidah kebahasaan teks ilmiah",
          "Contoh teks ilmiah"
        ]
      },
      {
        title: "Puisi",
        content: [
          "Pengertian puisi",
          "Jenis-jenis puisi",
          "Menulis puisi",
          "Analisis puisi"
        ]
      },
      {
        title: "Novel",
        content: [
          "Pengertian novel",
          "Unsur intrinsik novel",
          "Unsur ekstrinsik novel",
          "Contoh analisis novel"
        ]
      }
    ]
  };
  

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-orange-100 to-slate-400 font-sans flex flex-col">
      <Navbar active="material"/>
      <div className="flex m-[3vh] flex-grow">
        <div className="w-fit h-fit bg-blue-950 items-center text-center rounded-3xl px-[2vh] mt-[5vh]">
          <div className="text-4xl my-6">Subject</div>
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
            {materialData[option as keyof typeof materialData].map((data: any) => (
              <div key={data.title} className="mb-[3vh] border border-black rounded-3xl bg-graystitle">
                <button className="bg-graystitle h-fit w-[74vw] rounded-3xl p-[3vh] flex text-left" onClick={() => setOpen(open === data.title ? null : data.title)}>
                  <div className="font-semibold w-full text-black text-3xl">{data.title}</div>
                  <div className="w-full justify-end items-center flex">
                    { open === data.title ? <img src={collapse} alt="^" className="h-auto w-[5%]" /> : <img src={dropdown} alt="v" className="h-auto w-[5%]" /> }
                  </div>
                </button>
                {open === data.title && (
                  <div>
                    {data.content.map((item: string, index: number) => (
                      <>
                        <div className="text-black text-xl mx-[3vh] my-[1vh]">
                        <a href="https://www.w3schools.com/c/c_intro.php" key={index} className="text-black">
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
      <Footer />
    </div>
  );
}

export default Material;
