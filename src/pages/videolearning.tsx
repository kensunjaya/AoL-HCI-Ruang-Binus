import { useState } from "react";
import CustomButton from "../components/CustomButton";
import Navbar from "../components/Navbar";
import dropdown from "../assets/images/dropdown.png";

const VideoLearning = () =>{
  const [forum, setForum] = useState("algo");
  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-orange-100 to-slate-400">
      <Navbar />
      <div className="flex m-[3vh]">
        <div className="w-fit h-fit bg-blue-950 items-center text-center rounded-3xl px-[2vh] mt-[5vh]">
          <div className="text-5xl my-6">Kategori</div>
            <CustomButton title="Algorithm and Programming" style={`${forum === "algo" ? "bg-green-600" : "bg-bluepale"} w-[30vh] font-semibold text-white mb-6 mt-3`} onClick={() => setForum("algo")}/>
            <br />
            <CustomButton title="Program Design Methods" style={`${forum === "pdm" ? "bg-green-600" : "bg-bluepale"} w-[30vh] font-semibold text-white mb-6`} onClick={() => setForum("pdm")}/>
            <br />
            <CustomButton title="Basic Statistics" style={`${forum === "bastat" ? "bg-green-600" : "bg-bluepale"} w-[30vh] font-semibold text-white mb-6`} onClick={() => setForum("bastat")}/>
            <br />
            <CustomButton title="Character Building: Pancasila" style={`${forum === "cb" ? "bg-green-600" : "bg-bluepale"} w-[30vh] font-semibold text-white mb-6`} onClick={() => setForum("cb")}/>
            <br />
            <CustomButton title="Discrete Mathematics" style={`${forum === "discrete" ? "bg-green-600" : "bg-bluepale"} w-[30vh] font-semibold text-white mb-6`} onClick={() => setForum("discrete")}/>
            <br />
            <CustomButton title="Indonesian" style={`${forum === "indo" ? "bg-green-600" : "bg-bluepale"} w-[30vh] font-semibold text-white mb-6`} onClick={() => setForum("indo")}/>
          </div>
        <div>
          <div className="h-fit w-fit border border-black m-[5vh] rounded-3xl">
            <div className="bg-graystitle h-fit w-[76vw] rounded-3xl border border-black p-[3vh] flex">
              <div className="font-semibold w-full text-black text-3xl">{"Judul Materi"}</div>
              <div className="w-full justify-end items-center border flex">
                <img src={dropdown} alt="v" className="h-auto w-[5%]"/>
              </div>
            </div>
            <div className="text-black m-[3vh]">
              Variables and data types
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default VideoLearning