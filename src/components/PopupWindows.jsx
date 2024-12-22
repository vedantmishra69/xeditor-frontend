import { X } from "lucide-react";
import { useStatesContext } from "../contexts/StatesContext";
import JoinWindow from "./JoinWindow";
import NewFile from "./NewFile";
import OpenFile from "./OpenFile";
import Settings from "./Settings";
import UserList from "./UserList";

const PopupWindows = () => {
  const {
    settingsOpen,
    setSettingsOpen,
    userListOpen,
    setUserListOpen,
    newFileOpen,
    setNewFileOpen,
    joinOpen,
    setJoinOpen,
    fileListOpen,
    setFileListOpen,
  } = useStatesContext();

  return (
    (settingsOpen ||
      userListOpen ||
      newFileOpen ||
      joinOpen ||
      fileListOpen) && (
      <div className="fixed inset-0 z-10 flex justify-center items-center backdrop-brightness-50">
        <div className="flex bg-color1 flex-col min-w-96 w-fit border-2 border-color2">
          <div className="relative flex flex-row justify-center text-xl h-8">
            <span className="flex">
              {settingsOpen && "Settings"}
              {userListOpen && "Online Users"}
              {fileListOpen && "Open File"}
              {newFileOpen && "New File"}
              {joinOpen && "Join Room"}
            </span>
            <X
              className="absolute h-full w-8 right-0 hover:bg-color2 hover:text-color1"
              onClick={() => {
                setSettingsOpen(false);
                setUserListOpen(false);
                setNewFileOpen(false);
                setJoinOpen(false);
                setFileListOpen(false);
              }}
            />
          </div>
          <div className="p-2">
            {settingsOpen && <Settings close={() => setSettingsOpen(false)} />}
            {userListOpen && <UserList close={() => setUserListOpen(false)} />}
            {fileListOpen && <OpenFile close={() => setFileListOpen(false)} />}
            {newFileOpen && <NewFile close={() => setNewFileOpen(false)} />}
            {joinOpen && <JoinWindow close={() => setJoinOpen(false)} />}
          </div>
        </div>
      </div>
    )
  );
};

export default PopupWindows;
