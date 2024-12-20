import { Download, LucideUsers, Plus, Share2Icon } from "lucide-react";
import TaskBarButton from "./TaskBarButton";
import RunButton from "./RunButton";
import DropDownMenuButton from "./DropDownMenuButton";
import { LANGUAGE_MAPPING } from "../lib/constants";
import { useState } from "react";
import OpenFileDropDown from "./OpenFileDropDown";

const TaskBar = () => {
  const [language, setLanguage] = useState("Python (3.8.1)");
  const [currentFileName, setCurrentFileName] = useState("default");

  const handeLanguageChange = (newVal) => {
    setLanguage(newVal);
  };

  return (
    <div className="flex flex-row border-l-2 border-color2 cursor-pointer">
      <TaskBarButton text="New">
        <Plus size={21} />
      </TaskBarButton>
      <OpenFileDropDown value={currentFileName} />
      <TaskBarButton text="Download">
        <Download size={21} />
      </TaskBarButton>
      <TaskBarButton text="Invite">
        <Share2Icon size={21} />
      </TaskBarButton>
      <TaskBarButton text="Join">
        <LucideUsers size={21} />
      </TaskBarButton>
      <DropDownMenuButton
        value={language}
        onChange={handeLanguageChange}
        options={Object.keys(LANGUAGE_MAPPING)}
      />
      <RunButton />
    </div>
  );
};

export default TaskBar;
