import { useNavigate } from "react-router";
import CustomButton from "../components/CustomButton";
import Navbar from "../components/Navbar";
import { auth } from "../firebaseSetup"
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

const SignIn = () =>{
  const navigate = useNavigate();
  const user = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth,
        email,
        password
      );
      setErrorMsg("");
      setEmail("");
      setPassword("");
      navigate("/")
    } catch (error) {
      console.error(error);
      setErrorMsg((error as any).message.slice(10));
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