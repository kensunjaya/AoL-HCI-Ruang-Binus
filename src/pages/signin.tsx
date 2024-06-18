import { useLocation, useNavigate } from "react-router";
import CustomButton from "../components/CustomButton";
import Navbar from "../components/Navbar";
import { auth, db } from "../firebaseSetup"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import loginimg from "../assets/images/loginimg.png";
import { BeatLoader, ScaleLoader } from "react-spinners";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () =>{
  const navigate = useNavigate();
  const user = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.state?.showToast) {
      toast.error("Please sign in to access our web", {
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

  const signIn = async () => {
    if (email === "" || password === "") {
      toast.error("Please fill in all required fields", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth,
        email,
        password
      );
      const userData = await getUser();
      user?.setUserData(userData);
      navigate("/")
    } catch (error) {
      console.error(error);
      toast.error((error as any).message.slice(10), {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const docRef = doc(db, "users", email);
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
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && !event.shiftKey && !loading) {
      event.preventDefault();
      signIn();
    }
  };

  return (
    <div className="w-screen h-screen flex items-center bg-gradient-to-r from-orange-100 to-slate-400 font-sans">
      <form className="form-content p-10 m-[20vh] h-fit w-fit rounded-xl text-center">
      {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-black">
            <ScaleLoader loading={loading} color="white" margin={5} height={35}/>
          </div>
      )}
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
        <div className="text-4xl text-gray-800 pb-[3vh] font-semibold">Welcome to Ruang Binus</div>
        <div className="form-group pb-5">
          <input onKeyDown={handleKeyDown} type="email" id="formEmail" placeholder="email" className="p-3 rounded-xl bg-white text-black min-w-[36rem] shadow-lg" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group pb-5">
          <input onKeyDown={handleKeyDown} type="password" id="formPassword" placeholder="password" className="p-3 rounded-xl bg-white text-black min-w-[36rem] shadow-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {errorMsg !== "" && <div className="text-red-400 mb-5">{errorMsg}</div>}
        <div>
          <div className="flex pb-5 justify-end">
            <div className="pr-2 text-gray-800">Don't have an account?</div>
            <Link to="/signup" className="text-orange-400 font-semibold">Register here</Link>
          </div>
          <button onClick={signIn} type="button" className="btn btn-primary rounded-full py-3 mr-5 bg-orange-400 px-20 shadow-md text-lg">
            Sign in
          </button>
        </div>
      </form>
      <div className="w-full h-screen flex items-end justify-end">
        <img src={loginimg} alt="Login image" className="w-[80%] h-auto" />
      </div>
    </div>
  );
}

export default SignIn