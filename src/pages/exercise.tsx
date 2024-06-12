import Navbar from "../components/Navbar";

const Exercise = () =>{
  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-orange-100 to-slate-400">
      <Navbar active="exercise"/>
      <h1 className="text-reds text-10xl font-bold">Exercise</h1>
    </div>
  );
}

export default Exercise