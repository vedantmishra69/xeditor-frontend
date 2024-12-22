import CodeEditor from "../components/CodeEditor";
import InputBox from "../components/InputBox";
import PopupWindows from "../components/PopupWindows";
import TaskBar from "../components/TaskBar";
import { useCodeContext } from "../contexts/CodeEditorContext";
import { useCollabContext } from "../contexts/CollaborationContext";
import { LANGUAGE_MAPPING } from "../lib/constants";

const CodeEditorPage = () => {
  const { language } = useCodeContext();
  const { currentFileName } = useCollabContext();
  const displayFileName =
    currentFileName &&
    language &&
    currentFileName + LANGUAGE_MAPPING[language]?.extension;

  return (
    <div className="h-screen w-full bg-color1 flex flex-col text-color5 overflow-hidden">
      <PopupWindows />
      <TaskBar />
      <div className="flex-1 flex flex-row overflow-hidden">
        <div className="flex-1 flex flex-col border-x-2 border-b-2 border-color2 overflow-hidden">
          <div className="flex justify-center text-lg border-b-2 border-color2 py-1">
            {displayFileName}
          </div>
          <div className="flex-1 overflow-hidden">
            <CodeEditor />
          </div>
        </div>
        <div className="flex-1 flex flex-col border-r-2 border-b-2 border-color2 overflow-hidden">
          <div className="flex-1 flex flex-row border-b-2 border-color2">
            <div>
              <InputBox />
            </div>
            <div></div>
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorPage;
