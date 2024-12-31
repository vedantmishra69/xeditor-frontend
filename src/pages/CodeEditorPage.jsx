import { BarLoader } from "react-spinners";
import ChatWindow from "../components/ChatWindow";
import CodeEditor from "../components/CodeEditor";
import InputBox from "../components/InputBox";
import OutputBox from "../components/OutputBox";
import PopupWindows from "../components/PopupWindows";
import TaskBar from "../components/TaskBar";
import { useCodeContext } from "../contexts/CodeEditorContext";
import { useCollabContext } from "../contexts/CollaborationContext";
import { LANGUAGE_MAPPING } from "../lib/constants";
import { useStatesContext } from "../contexts/StatesContext";

const CodeEditorPage = () => {
  const { language, input, setInput, output, setOutput } = useCodeContext();
  const { currentFileName } = useCollabContext();
  const { mainLoading } = useStatesContext();

  const displayFileName =
    currentFileName &&
    language &&
    currentFileName + LANGUAGE_MAPPING[language]?.extension;

  const languageOptions = [];
  for (const name in LANGUAGE_MAPPING) {
    languageOptions.push(
      <option key={name} value={name}>
        {name}
      </option>
    );
  }

  return (
    <div className="relative h-screen w-full bg-color1 flex flex-col text-color5 overflow-hidden ">
      {mainLoading && (
        <div className="z-10 absolute top-0 inset-x-0 flex items-center justify-center bg-color1 bg-opacity-60">
          <BarLoader height={2} width={window.innerWidth} color="#F8F8F2" />
        </div>
      )}
      <PopupWindows />
      <TaskBar />
      <div className="flex-1 flex flex-row overflow-hidden">
        <div className="flex-1 flex flex-col border-x-2 border-b-2 border-color2 overflow-hidden">
          <div className="flex justify-center text-lg border-b-2 border-color2 py-1 cursor-default">
            {displayFileName || "loading"}
          </div>
          <div className="flex-1 overflow-hidden">
            <CodeEditor />
          </div>
        </div>
        <div className="flex-1 flex flex-col border-r-2 border-b-2 border-color2 overflow-hidden">
          <div className="h-1/2 flex flex-row border-b-2 border-color2">
            <div className="w-1/2">
              <InputBox value={input} onChange={setInput} />
            </div>
            <div className="w-1/2">
              <OutputBox value={output} onChange={setOutput} />
            </div>
          </div>
          <div className="h-1/2">
            <ChatWindow />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorPage;
