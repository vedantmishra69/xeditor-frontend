/* eslint-disable react/prop-types */
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const DropDownMenuButton = ({ value, onChange, options }) => {
  const [isDropDown, setIsDropDown] = useState(false);

  const handleDropDown = () => setIsDropDown(!isDropDown);
  const handleOption = (newValue) => {
    onChange(newValue);
  };

  const optionList = options?.map((item, index) => (
    <div
      key={index}
      className="px-2 py-1 hover:bg-color2 hover:text-color1"
      onClick={() => handleOption(item)}
    >
      {item}
    </div>
  ));

  return (
    <div
      className={
        "w-56 relative flex flex-row items-center justify-between py-2 pl-4 pr-2 border-r-2 border-y-2 border-color2 text-xl" +
        (isDropDown ? "" : " hover:bg-color2 hover:text-color1")
      }
      onClick={handleDropDown}
    >
      <div className="truncate">{value}</div>
      <div
        className={
          (isDropDown ? "rotate-180" : "") +
          " transition-transform duration-500"
        }
      >
        <ChevronDown />
      </div>
      {isDropDown && (
        <div className="max-h-60 text-start text-lg absolute top-14 -inset-x-10 flex flex-col border-2 border-color2 overflow-scroll">
          {optionList}
        </div>
      )}
    </div>
  );
};

export default DropDownMenuButton;
