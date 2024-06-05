const CustomButton = (props: any) => {
  return (
    <a href={props.onClick ? props.onClick : ""} className="h-fit w-fit bg-white text-center rounded-full m-5 px-[5vh]">
      <div className="font-semibold text-blue-400 text-lg m-1">{props.title}</div>
    </a>
  )
}

export default CustomButton