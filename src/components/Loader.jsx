import { MoonLoader } from "react-spinners";

// add 'relative' to parent before using
const Loader = () => {
  return (
    <div className="absolute inset-0 h-full w-full flex justify-center items-center bg-color1">
      <MoonLoader color="#6272A4" size={40} />
    </div>
  );
};

export default Loader;
