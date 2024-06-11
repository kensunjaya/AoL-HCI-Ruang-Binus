import { useNavigate } from "react-router";
import CustomButton from "../components/CustomButton";
import Navbar from "../components/Navbar";
import { auth, db } from "../firebaseSetup"
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () =>{
  const navigate = useNavigate();
  const user = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");

  const storeUserData = async () => {
    try {
      const docRef = await setDoc(doc(db, "users", email),{
        nama: nama,
        nim: nim,
        email: email,
        password: password,
        ipk: 0,
      });
      console.log(docRef);
      setErrorMsg("");
      navigate("/signin");
    }
    catch (error) {
      console.log(error);
      setErrorMsg((error as any).message.slice(10));
    }
  }

  const createAccount = async () => {
    if (konfirmasiPassword !== password) {
      setErrorMsg("Password tidak sesuai!");
      return;
    }
    if (!email.endsWith("@binus.ac.id") && !email.endsWith("@binus.edu")) {
      setErrorMsg("Email harus menggunakan email binusian!");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth,
        email,
        password
      );
      storeUserData();
    } catch (error) {
      console.error(error);
      setErrorMsg((error as any).message.slice(10));
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-orange-100 to-slate-400">
      {/* <CustomButton onClick={createAccount} title="Hello"/> */}
      <form className="form-content p-10 w-[40vh] bg-bluepale rounded-xl">
        <div className="font-semibold text-lg pb-5">Welcome to Ruang Binus</div>
        <div className="form-group pb-5">
          <div className="font-semibold pb-3">Nama Lengkap: </div>
          <input type="text" placeholder="nama lengkap" className="p-3 rounded-xl bg-white text-black w-full" value={nama} onChange={(e) => setNama(e.target.value)} />
        </div>
        <div className="form-group pb-5">
          <div className="font-semibold pb-3">NIM Binusian: </div>
          <input type="text" placeholder="nim" className="p-3 rounded-xl bg-white text-black w-full" value={nim} onChange={(e) => setNim(e.target.value)} />
        </div>
        <div className="form-group pb-5">
          <div className="font-semibold pb-3">Email: </div>
          <input type="email" id="formEmail" placeholder="email binusian" className="p-3 rounded-xl bg-white text-black w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group pb-5">
          <div className="font-semibold pb-3">Password: </div>
          <input type="password" id="formPassword" placeholder="password" className="p-3 rounded-xl bg-white text-black w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-group pb-5">
          <div className="font-semibold pb-3">Konfirmasi Password: </div>
          <input type="password" id="formPassword" placeholder="password" className="p-3 rounded-xl bg-white text-black w-full" value={konfirmasiPassword} onChange={(e) => setKonfirmasiPassword(e.target.value)} />
        </div>
        {errorMsg !== "" && <div className="text-red-400 mb-5">{errorMsg}</div>}
        <div>
          <button onClick={createAccount} type="button" className="btn btn-primary rounded-xl mr-5 bg-orange-400">
            Create account
          </button>
          <div className="flex pt-3">
            <div className="pr-2">Already have an account?</div>
            <Link to="/signin" className="text-orange-400">Login here</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp