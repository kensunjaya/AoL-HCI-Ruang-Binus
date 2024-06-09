import CustomButton from "./CustomButton"
import logo from '../assets/images/logo.svg'
import profile from '../assets/images/profile.jpg'
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"


const Navbar = () => {
  const user = useContext(AuthContext);
  return (
    <div className="flex">
      <div className="flex items-center w-full">
        <img src={logo} alt="Logo" className="w-50 h-20"/>
        <CustomButton title="Home" onClick="/" style="text-blue-400 font-bold bg-white m-5"/>
        <CustomButton title="Forum" onClick="/forum" style="text-blue-400 font-bold bg-white m-5"/>
        <CustomButton title="Material" onClick="/material" style="text-blue-400 font-bold bg-white m-5"/>
        <CustomButton title="Video Learning" onClick="/videolearning" style="text-blue-400 font-bold bg-white m-5"/>
        <CustomButton title="Exercise" onClick="/exercise" style="text-blue-400 font-bold bg-white m-5"/>
      </div>
      <Link to="/profile" className="flex items-center mx-auto justify-end">
        <img src={profile} alt="Photo" className="h-[4vh] w-[4vh] rounded-full"/>
        <div className="text-black mx-[1vh] font-semibold">{user?.userData.nama} - {user?.userData.nim}</div>
      </Link>
    </div>
  )
}

export default Navbar