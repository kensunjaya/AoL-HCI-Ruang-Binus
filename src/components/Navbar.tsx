import CustomButton from "./CustomButton"
import logo from '../assets/images/logo.svg'

const Navbar = () => {
  return (
    <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-50 h-20"/>
        <CustomButton title="Home"/>
        <CustomButton title="Forum"/>
        <CustomButton title="Material"/>
        <CustomButton title="Video Learning"/>
        <CustomButton title="Exercise"/>
      </div>
  )
}

export default Navbar