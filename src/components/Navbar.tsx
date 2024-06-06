import CustomButton from "./CustomButton"
import logo from '../assets/images/logo.svg'
import profile from '../assets/images/profile.jpg'
import { Link } from "react-router-dom"


const Navbar = () => {
  return (
    <div className="flex">
      <div className="flex items-center w-full">
        <img src={logo} alt="Logo" className="w-50 h-20"/>
        <CustomButton title="Home" onClick="/"/>
        <CustomButton title="Forum" onClick="/forum"/>
        <CustomButton title="Material" onClick="/material"/>
        <CustomButton title="Video Learning" onClick="/videolearning"/>
        <CustomButton title="Exercise" onClick="/exercise"/>
      </div>
      <Link to="/profile" className="flex items-center mx-auto justify-end">
        <img src={profile} alt="Photo" className="h-[4vh] w-[4vh] rounded-full"/>
        <div className="text-black mx-[1vh] font-semibold">Gauss Seidel - 2702273315</div>
      </Link>
    </div>
  )
}

export default Navbar