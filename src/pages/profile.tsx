import { useNavigate } from "react-router";
import CustomButton from "../components/CustomButton";
import Navbar from "../components/Navbar";
import { auth } from "../firebaseSetup"

const Profile = () =>{
  const navigate = useNavigate();
  const signOut = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-orange-100 to-slate-400">
      <Navbar />
      <h1 className="text-reds text-10xl font-bold">User Profile</h1>
      <CustomButton title="Sign Out" style="bg-red-500 m-10" onClick={signOut}/>
    </div>
  );
}

export default Profile