import { useNavigate } from "react-router";
import CustomButton from "../components/CustomButton";
import Navbar from "../components/Navbar";
import { auth, db } from "../firebaseSetup"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import profile from '../assets/images/profile.jpg'
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updatePassword } from "firebase/auth";
import { BeatLoader, ScaleLoader } from "react-spinners";

const Profile = () =>{
  const user = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => { // render sebelum return (hanya 1x)
    if (!auth.currentUser) {
      navigate("/signin", { state: { showToast: true } });
    }
  }, []);


  const signOut = async () => {
    await auth.signOut();
    navigate('/');
  };

  const displayPassword = (len: number) => {
    let password = "";
    for (let i = 0; i < len; i++) {
      password += "*";
    }
    return password;
  }

  const getUser = async () => {
    try {
      
      if (!user?.userData.email) return null;
      const docRef = doc(db, "users", user?.userData.email);
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
      
    }
  };

  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const changePassword = async () => {
    if (currentPassword === "" || newPassword === "") {
      setErrorMsg("Please fill in all required fields!");
      
      return;
    }
    setLoading(true);
    if (currentPassword !== user?.userData.password) {
      setTimeout(() => {
        setLoading(false); 
        setErrorMsg("Incorrect current password!");
      }, 500);
      return;
    }
    try {
      await updateDoc(doc(db, "users", user?.userData.email), {
        password: newPassword,
      }).then(() => {
        if (auth.currentUser === null) return;
        updatePassword(auth.currentUser, newPassword);
        getUser().then((userData) => {
          user?.setUserData(userData);
        });
      });
      setErrorMsg("");
      setCurrentPassword("");
      setNewPassword("");
      setOpenChangePassword(false);
      alert("Password changed successfully!");
    } catch (error) {
      console.error(error);
      setErrorMsg((error as any).message.slice(10));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-orange-100 to-slate-400 font-sans">
      <Navbar />
      <div className="w-screen h-[80vh] items-center justify-center flex">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-black">
          <ScaleLoader loading={loading} color="white" margin={5} height={35}/>
        </div>
      )}
        <div>
          <div className="min-w-[80vh] h-fit bg-graystitle rounded-3xl flex text-black p-10 text-2xl mb-10">
            <div className="mr-10">
              <div className="my-1">Nama</div>
              <div className="my-1">Nomor Induk Mahasiswa</div>
              <div className="my-1">Tempat, tanggal lahir</div>
              <div className="my-1">Gender</div>
              <div className="my-1">Email</div>
              <div className="my-1">Phone Number</div>
            </div>
            <div className="mr-10">
              <div className="my-1">{user?.userData.nama}</div>
              <div className="my-1">{user?.userData.nim}</div>
              <div className="my-1">{"-"}</div>
              <div className="my-1">{"-"}</div>
              <div className="my-1">{user?.userData.email}</div>
              <div className="my-1">{"-"}</div>
            </div>
            <div className="p-5 items-center justify-center flex">
              <img src={profile} alt="Picture" className="rounded-full w-[15vh] h-[15vh]"/>
            </div>
          </div>
          <div className="min-w-[80vh] h-fit bg-graystitle rounded-3xl flex text-black p-10 text-2xl">
            { !openChangePassword ? (
              <>
                <div className="mr-10">
                  <div>Password</div>
                </div>
                <div className="mr-10">
                  <div>{displayPassword(user?.userData.password.length ? user?.userData.password.length : 0)}</div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <input type="text" placeholder="current password" className="p-2 rounded-xl bg-white text-black w-full mb-5 text-lg" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                  <input type="text" placeholder="new password" className="p-2 rounded-xl bg-white text-black w-full mb-5 text-lg" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                  {errorMsg !== "" && <div className="text-red-400 text-lg mb-5">{errorMsg}</div>}
                  <CustomButton title="Change Password" style="bg-blue-400 mr-10 text-white" onClick={changePassword}/>
                </div>
              </>
            )}
            
          </div>
          <div className="flex my-10">
            <CustomButton title="Sign Out" style="bg-red-500 mr-10" onClick={signOut}/>
            <CustomButton title="Change Password" style="bg-blue-400" 
              onClick={() => 
            {
              setOpenChangePassword(!openChangePassword);
              setErrorMsg("");
              setCurrentPassword("");
              setNewPassword("");
            }}/>
          </div>

        </div>
      </div>
      
    </div>
  );
}

export default Profile