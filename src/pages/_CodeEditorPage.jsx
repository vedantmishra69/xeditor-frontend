import PopupWindows from "../components/PopupWindiws";
import TaskBar from "../components/TaskBar";

const CodeEditorPage = () => {
  return (
    <div className="min-h-screen w-full bg-color1 flex flex-col text-color5">
      <PopupWindows />
      <TaskBar />
    </div>
  );
};

export default CodeEditorPage;
