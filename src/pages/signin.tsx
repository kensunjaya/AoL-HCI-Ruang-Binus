import { useNavigate } from "react-router";
import CustomButton from "../components/CustomButton";
import Navbar from "../components/Navbar";
import { auth, db } from "../firebaseSetup"
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

const SignIn = () =>{
  const navigate = useNavigate();
  const user = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    if (email === "" || password === "") {
      setErrorMsg("Please fill in all required fields!");
      return;
    }
    try {
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
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-orange-100 to-slate-400">
      {/* <CustomButton onClick={createAccount} title="Hello"/> */}
      <form className="form-content p-10 bg-bluepale rounded-xl">
        <div className="font-semibold text-lg pb-5">Selamat Datang di Ruang Binus</div>
        <div className="form-group pb-5">
          <div className="font-semibold pb-3">Email: </div>
          <input type="email" id="formEmail" placeholder="email" className="p-3 rounded-xl bg-white text-black min-w-[25vh]" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group pb-5">
          <div className="font-semibold pb-3">Password: </div>
          <input type="password" id="formPassword" placeholder="password" className="p-3 rounded-xl bg-white text-black min-w-[25vh]" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {errorMsg !== "" && <div className="text-red-400 mb-5">{errorMsg}</div>}
        <div>
          <button onClick={signIn} type="button" className="btn btn-primary rounded-xl mr-5 bg-orange-400 px-10">
            Sign in
          </button>
          <div className="flex pt-3">
            <div className="pr-2">Don't have an account?</div>
            <Link to="/signup" className="text-orange-400">Register here</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignIn