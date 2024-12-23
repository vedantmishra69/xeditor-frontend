import { Play } from "lucide-react";
const RunButton = ({ ...props }) => {
  return (
    <div
      className="flex flex-row items-center gap-2 py-2 pl-4 pr-6 border-r-2 border-y-2 border-color2 bg-color2 text-color1 hover:bg-color3 hover:text-color5 hover:border-color3"
      {...props}
    >
      <Play size={21} />
      <div className="flex text-xl">Run</div>
    </div>
  );
};

export default RunButton;
