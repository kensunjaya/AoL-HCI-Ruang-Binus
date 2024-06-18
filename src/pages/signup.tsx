import { useNavigate } from "react-router";
import { auth, db } from "../firebaseSetup"
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { BeatLoader, ScaleLoader } from "react-spinners";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () =>{
  const navigate = useNavigate();
  const user = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
      navigate("/signin");
    }
    catch (error) {
      console.log(error);
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
    }
  }

  const createAccount = async () => {
    if (email === "" || password === "" || nama === "" || nim === "" || konfirmasiPassword === "") {
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
    if (konfirmasiPassword !== password) {
      toast.error("Confirm password doesn't match", {
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
    if (!email.endsWith("@binus.ac.id") && !email.endsWith("@binus.edu")) {
      toast.error("Please register using your Binusian email", {
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
      await createUserWithEmailAndPassword(auth,
        email,
        password
      );
      await storeUserData();
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

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-orange-100 to-slate-400 font-sans text-white">
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
      <form className="form-content p-10 min-w-[40rem] bg-orange-400 rounded-xl shadow-lg">
        <div className="font-semibold pb-5 text-center text-2xl">Welcome to Ruang Binus</div>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-black">
            <ScaleLoader loading={loading} color="white" margin={5} height={35}/>
          </div>
        )}
        <div className="form-group pb-5">
          <div className="font-semibold pb-3">Full Name: </div>
          <input type="text" placeholder="nama lengkap" className="p-3 rounded-xl bg-white text-black w-full" value={nama} onChange={(e) => setNama(e.target.value)} />
        </div>
        <div className="form-group pb-5">
          <div className="font-semibold pb-3">Student ID: </div>
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
          <div className="font-semibold pb-3">Confirm Password: </div>
          <input type="password" id="formPassword" placeholder="konfirmasi password" className="p-3 rounded-xl bg-white text-black w-full" value={konfirmasiPassword} onChange={(e) => setKonfirmasiPassword(e.target.value)} />
        </div>
        <div>
          <button onClick={createAccount} type="button" className="btn btn-primary rounded-xl mr-5 bg-bluesk shadow-lg">
            Create account
          </button>
          <div className="flex pt-3">
            <div className="pr-2">Already have an account?</div>
            <Link to="/signin" className="text-bluesk">Login here</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp