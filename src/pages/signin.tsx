import { useNavigate } from "react-router";
import CustomButton from "../components/CustomButton";
import Navbar from "../components/Navbar";
import { auth, db } from "../firebaseSetup"
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import loginimg from "../assets/images/loginimg.png";
import { BeatLoader } from "react-spinners";

const SignIn = () =>{
  const navigate = useNavigate();
  const user = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    if (email === "" || password === "") {
      setErrorMsg("Please fill in all required fields!");
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
      setErrorMsg("");
      navigate("/")
    } catch (error) {
      console.error(error);
      setErrorMsg((error as any).message.slice(10));
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

  return (
    <div className="w-screen h-screen flex items-center bg-gradient-to-r from-orange-100 to-slate-400 font-sans">
      <form className="form-content p-10 m-[20vh] h-fit w-fit rounded-xl text-center">
        <div className="text-4xl text-black pb-[3vh]">Welcome to Ruang Binus</div>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-black">
            <BeatLoader loading={loading} size={50} color="white" margin={10}/>
          </div>
        )}
        <div className="form-group pb-5">
          <input type="email" id="formEmail" placeholder="email" className="p-3 rounded-xl bg-white text-black min-w-[50vh] shadow-lg" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group pb-5">
          <input type="password" id="formPassword" placeholder="password" className="p-3 rounded-xl bg-white text-black min-w-[50vh] shadow-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {errorMsg !== "" && <div className="text-red-400 mb-5">{errorMsg}</div>}
        <div>
          <div className="flex pb-5 justify-end">
            <div className="pr-2 text-black">Don't have an account?</div>
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