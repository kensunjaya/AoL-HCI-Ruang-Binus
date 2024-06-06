import Navbar from "../components/Navbar";

const Profile = () =>{
  return (
    <div className="min-h-screen w-screen bg-gradient-to-r from-orange-100 to-slate-400">
      <Navbar />
      <h1 className="text-reds text-10xl font-bold">User Profile</h1>
    </div>
  );
}

export default Profile