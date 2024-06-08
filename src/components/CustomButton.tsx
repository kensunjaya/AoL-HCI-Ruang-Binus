import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';

const CustomButton = (props: any) => {

  const navigate = useNavigate();

  const handleClick = () => {
    if (props.onClick) {
      navigate(props.onClick);
    }
  };

  return (
    <button 
      onClick={typeof(props.onClick) === 'string' ? handleClick : props.onClick}
      className={`text-center rounded-full px-[5vh] text-lg ${props.style ? props.style : "bg-white h-fit w-fit font-semibold text-black"}`}>
      {props.title}
    </button>
  )
}

export default CustomButton