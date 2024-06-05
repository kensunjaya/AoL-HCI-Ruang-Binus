import CustomButton from "./CustomButton"
import logo from '../assets/images/logo.svg'
import profile from '../assets/images/profile.jpg'

const Navbar = () => {
  return (
    <div className="flex">
      <div className="flex items-center w-full">
        <img src={logo} alt="Logo" className="w-50 h-20"/>
        <CustomButton title="Home"/>
        <CustomButton title="Forum"/>
        <CustomButton title="Material"/>
        <CustomButton title="Video Learning"/>
        <CustomButton title="Exercise"/>
      </div>
      <a href="" className="flex items-center mx-auto justify-end">
        <img src={profile} alt="Photo" className="h-[4vh] w-[4vh] rounded-full"/>
        <div className="text-black mx-[1vh] font-semibold">Gauss Seidel - 2702273315</div>
      </a>
    </div>
  )
}

export default Navbar