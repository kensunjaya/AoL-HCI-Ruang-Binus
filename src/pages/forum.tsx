import { useContext, useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import dropdown from "../assets/images/dropdown.png";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseSetup";
import { ScaleLoader } from "react-spinners";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forum = () =>{
  const navigate = useNavigate();
  const [forum, setForum] = useState("algo");
  const [forumData, setForumData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const user = useContext(AuthContext);
  const location = useLocation();

  const getForumData = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, "datas", "forum");
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
    if (location.state?.showToast) {
      toast.success("Thread posted!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [location.state]);

  useEffect(() => {
    if (!auth.currentUser) navigate("/signin", { state: { showToast: true } });
    getForumData().then((data) => {
      if (data === null) return;
      setForumData(data as any);
    });
  }, []);

  const newThread = () => {
    navigate('/newthread');
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-orange-100 to-slate-400 flex flex-col">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar active="forum"/>
      
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-black">
          <ScaleLoader loading={loading} color="white" margin={5} height={35}/>
        </div>
      )}
      <div className="flex m-[3vh] flex-grow">
        <div className="w-fit h-fit bg-blue-950 items-center text-center rounded-3xl px-[2vh] mt-[5vh]">
          <div className="text-4xl my-6 font-sans">Subject</div>
            <CustomButton title="Algorithm and Programming" style={`${forum === "algo" ? "bg-green-600" : "bg-bluepale"} w-[35vh] font-sans text-white mb-6 mt-3`} onClick={() => {
              setForum("algo");
              user?.setCategory("algo");
            }}/>
            <br />
            <CustomButton title="Program Design Methods" style={`${forum === "pdm" ? "bg-green-600" : "bg-bluepale"} w-[35vh] font-sans text-white mb-6`} onClick={() => {
              setForum("pdm")
              user?.setCategory("pdm");
            }}/>
            <br />
            <CustomButton title="Basic Statistics" style={`${forum === "bastat" ? "bg-green-600" : "bg-bluepale"} w-[35vh] font-sans text-white mb-6`} onClick={() => {
              setForum("bastat")
              user?.setCategory("bastat");
            }}/>
            <br />
            <CustomButton title="Character Building: Pancasila" style={`${forum === "cb" ? "bg-green-600" : "bg-bluepale"} w-[35vh] font-sans text-white mb-6`} onClick={() => {
              setForum("cb")
              user?.setCategory("cb");
            }}/>
            <br />
            <CustomButton title="Discrete Mathematics" style={`${forum === "discrete" ? "bg-green-600" : "bg-bluepale"} w-[35vh] font-sans text-white mb-6`} onClick={() => {
              setForum("discrete")
              user?.setCategory("discrete");
            }}/>
            <br />
            <CustomButton title="Indonesian" style={`${forum === "indo" ? "bg-green-600" : "bg-bluepale"} w-[35vh] font-sans text-white mb-6`} onClick={() => {
              setForum("indo")
              user?.setCategory("indo");
            }}/>
          </div>
        <div>
          <div className="bg-orange-400 h-fit w-[74vw] m-[5vh] rounded-3xl p-[2vh] font-sans shadow-xl">
            <div className="items-center justify-start flex">
              <div className="w-full font-semibold text-3xl">{"Forum Diskusi"}</div>
              <div className="w-full items-center justify-end flex">
                <button className="bg-graystitle text-black text-lg" onClick={() => newThread()}>Create a new thread</button>
              </div>
            </div>
            
            {forumData?.[forum]?.map((data : any, index: number) => {
            return (
              <button key={index} onClick={() => {
                data.index = index;
                user?.setForumContent(data);
                navigate('/replyforum');
              }} 
                className="bg-graystitle h-fit w-full mx-auto my-[2vh] rounded-3xl p-[2vh] flex justify-start items-start text-left">
                <div>
                  <div className="font-semibold text-2xl text-black">{data.title}</div>
                  <div className="text-lg text-black">{data.author} - {data.date}</div>
                </div>
              </button>
            )
            })}
          </div>
          
        </div>
      </div>
      <Footer />
    </div>
    
  );
}

export default Forum