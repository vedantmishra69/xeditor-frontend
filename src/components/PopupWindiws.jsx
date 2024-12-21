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
      <div className="fixed inset-0 z-10 flex justify-center items-center backdrop-brightness-75">
        {settingsOpen && <Settings close={() => setSettingsOpen(false)} />}
        {userListOpen && <UserList close={() => setUserListOpen(false)} />}
        {fileListOpen && <OpenFile close={() => setFileListOpen(false)} />}
        {newFileOpen && <NewFile close={() => setNewFileOpen(false)} />}
        {joinOpen && <JoinWindow close={() => setJoinOpen(false)} />}
      </div>
    )
  );
};

export default PopupWindows;
