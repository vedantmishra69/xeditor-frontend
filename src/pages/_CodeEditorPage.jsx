import DefaultButton from "../components/DefaultButton";
import PopupWindows from "../components/PopupWindows";
import TaskBar from "../components/TaskBar";

const CodeEditorPage = () => {
  return (
    <div className="min-h-screen w-full bg-color1 flex flex-col text-color5">
      <PopupWindows />
      <TaskBar />
      <div className="mt-10">
        <DefaultButton />
      </div>
    </div>
  );
};

export default CodeEditorPage;
