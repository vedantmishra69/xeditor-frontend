/* eslint-disable react/prop-types */
import { ChevronDown, Edit3, Trash2 } from "lucide-react";
import { useState } from "react";

const OpenFileDropDown = () => {
  const [isDropDown, setIsDropDown] = useState(false);
  const [currentFileName, setCurrentFileName] = useState("default.py");
  const options = ["file1", "file2", "file3"];

  const handleDropDown = () => setIsDropDown(!isDropDown);
  const handleOption = (newValue) => {
    setCurrentFileName(newValue);
  };

  const optionList = options?.map((item, index) => (
    <div
      key={index}
      className="flex flex-row px-2 py-1 hover:bg-color2 hover:text-color1 justify-between"
      onClick={() => handleOption(item)}
    >
      {item}
      <div className="flex flex-row gap-3">
        <Edit3 />
        <Trash2 />
      </div>
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
      <div className="truncate text-clip">{currentFileName}</div>
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

export default OpenFileDropDown;
