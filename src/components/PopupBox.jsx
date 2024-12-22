/* eslint-disable react/prop-types */
import { X } from "lucide-react";

const PopupBox = ({ children, name = "BoxName", close }) => {
  return (
    <div className="flex flex-col min-w-96 w-fit border-2 border-color2 bg-color1">
      <div className="relative flex flex-row justify-center text-xl h-8">
        <span className="flex">{name}</span>
        <X
          className="absolute h-full w-8 right-0 hover:bg-color2 hover:text-color1"
          onClick={close}
        />
      </div>
      <div className="p-2">{children}</div>
    </div>
  );
};

export default PopupBox;
