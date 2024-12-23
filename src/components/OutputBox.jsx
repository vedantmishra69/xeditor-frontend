import { Trash2 } from "lucide-react";

/* eslint-disable react/prop-types */
const OutputBox = ({ value, onChange }) => {
  const clear = () => onChange("");

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-row relative justify-center py-1 border-b-2 border-color2 text-lg">
        <span>Output</span>
        <Trash2
          className="absolute right-2 text-slate-400 hover:text-color4"
          onClick={clear}
        />
      </div>
      <textarea
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        className="w-full h-full p-2 text-base bg-color1 text-color5 resize-none focus:outline-none font-mono"
        readOnly
      />
    </div>
  );
};
export default OutputBox;
