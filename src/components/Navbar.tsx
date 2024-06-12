import CustomButton from "./CustomButton"
import logo from '../assets/images/logo.svg'
import profile from '../assets/images/profile.jpg'
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"


const Navbar = (props: any) => {
  const user = useContext(AuthContext);
  return (
    <div className="flex">
      <div className="flex items-center w-full">
        <img src={logo} alt="Logo" className="w-50 h-20"/>
        <CustomButton title="Home" onClick="/" style={`shadow-lg font-sans font-semibold bg-white m-5 ${props.active === "home" ? "bg-blue-400 text-white" : "text-blue-400 bg-white"}`}/>
        <CustomButton title="Forum" onClick="/forum" style={`shadow-lg font-sans font-semibold bg-white m-5 ${props.active === "forum" ? "bg-blue-400 text-white" : "text-blue-400 bg-white"}`}/>
        <CustomButton title="Material" onClick="/material" style={`shadow-lg font-sans font-semibold bg-white m-5 ${props.active === "material" ? "bg-blue-400 text-white" : "text-blue-400 bg-white"}`}/>
        <CustomButton title="Video Learning" onClick="/videolearning" style={`shadow-lg font-sans font-semibold bg-white m-5 ${props.active === "videolearning" ? "bg-blue-400 text-white" : "text-blue-400 bg-white"}`}/>
        <CustomButton title="Exercise" onClick="/exercise" style={`shadow-lg font-sans font-semibold bg-white m-5 ${props.active === "exercise" ? "bg-blue-400 text-white" : "text-blue-400 bg-white"}`}/>
      </div>
      <Link to="/profile" className="flex items-center justify-end min-w-[50vh] pr-[1vh] font-sans font-semibold">
        <img src={profile} alt="Photo" className="h-[4vh] w-[4vh] rounded-full"/>
        <div className="text-black mx-[1vh] font-semibold">{user?.userData.nama} - {user?.userData.nim}</div>
      </Link>
    </div>
  )
}

export default Navbar