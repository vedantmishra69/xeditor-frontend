import { Download, LucideUsers, Plus, Share2Icon } from "lucide-react";
import TaskBarButton from "./TaskBarButton";
import RunButton from "./RunButton";
import DropDownMenuButton from "./DropDownMenuButton";
import { LANGUAGE_MAPPING } from "../lib/constants";
import OpenFileDropDown from "./OpenFileDropDown";
import { useCodeContext } from "../contexts/CodeEditorContext";
import { useCollabContext } from "../contexts/CollaborationContext";

const TaskBar = () => {
  const { language, handleLanguageChange } = useCodeContext();
  const { docId } = useCollabContext();

  const changeLanguage = (newVal) => handleLanguageChange(newVal, docId);

  return (
    <div className="flex flex-row border-l-2 border-color2 cursor-pointer">
      <TaskBarButton text="New">
        <Plus size={21} />
      </TaskBarButton>
      <OpenFileDropDown />
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
        onChange={changeLanguage}
        options={Object.keys(LANGUAGE_MAPPING)}
      />
      <RunButton />
    </div>
  );
};

export default TaskBar;
