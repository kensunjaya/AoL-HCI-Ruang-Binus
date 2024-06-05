const CustomButton = (props: any) => {
  return (
    <div className="h-fit w-fit bg-white text-center rounded-full m-5 px-[5vh]">
      <div className="font-semibold text-blue-400 text-lg m-1">{props.title}</div>
    </div>
  )
}

export default CustomButton