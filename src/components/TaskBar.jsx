import {
  Dot,
  Download,
  FolderOpen,
  LogOut,
  LucideUsers,
  Plus,
  Settings,
  Share2Icon,
} from "lucide-react";
import TaskBarButton from "./TaskBarButton";
import RunButton from "./RunButton";
import DropDownMenuButton from "./DropDownMenuButton";
import { LANGUAGE_MAPPING } from "../lib/constants";
import { useCodeContext } from "../contexts/CodeEditorContext";
import { useCollabContext } from "../contexts/CollaborationContext";
import { copyToClipboard } from "../lib/util";
import { toast } from "react-hot-toast";
import { useStatesContext } from "../contexts/StatesContext";
import UserTab from "./UserTab";
import GoogleSignInButton from "./GoogleSignInButton";
import { useAuthContext } from "../contexts/AuthContext";

const TaskBar = () => {
  const { language, handleLanguageChange, sourceCode } = useCodeContext();
  const { docId, currentFileName, joined, setJoined, connectedUsersCount } =
    useCollabContext();
  const {
    setNewFileOpen,
    setJoinOpen,
    setFileListOpen,
    setSettingsOpen,
    setUserListOpen,
  } = useStatesContext();
  const { isSignedIn } = useAuthContext();

  const handleNew = () => setNewFileOpen(true);

  const handleOpen = () => setFileListOpen(true);

  const handleJoin = () => setJoinOpen(true);

  const handleLeave = () => {
    setJoined(false);
    // setMessageList([]);
    toast.success("Room left successfully.");
  };

  const handleSettings = () => setSettingsOpen(true);

  const handleConnectedUsers = () => {
    if (connectedUsersCount) setUserListOpen(true);
  };

  const handleDownload = () => {
    if (sourceCode && currentFileName && language) {
      const blob = new Blob([sourceCode], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${currentFileName}${LANGUAGE_MAPPING[language].extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    }
  };

  const handleInvite = async () => {
    const response = await copyToClipboard(docId);
    toast.success(response.message);
  };

  const changeLanguage = (newVal) => handleLanguageChange(newVal, docId);

  return (
    <div className="flex flex-row border-l-2 border-color2 cursor-pointer">
      <div className="flex flex-row flex-1">
        <TaskBarButton text="New" onClick={handleNew}>
          <Plus size={21} />
        </TaskBarButton>
        <TaskBarButton text="Open" onClick={handleOpen}>
          <FolderOpen size={21} />
        </TaskBarButton>
        <DropDownMenuButton
          value={language}
          onChange={changeLanguage}
          options={Object.keys(LANGUAGE_MAPPING)}
          style={{ flex: "1 1 0%" }}
        />
        <RunButton />
        <TaskBarButton text="Download" onClick={handleDownload}>
          <Download size={21} />
        </TaskBarButton>
      </div>
      <div className="flex flex-row flex-1">
        <TaskBarButton text="Invite" onClick={handleInvite}>
          <Share2Icon size={21} />
        </TaskBarButton>
        {!joined ? (
          <TaskBarButton text="Join" onClick={handleJoin}>
            <LucideUsers size={21} />
          </TaskBarButton>
        ) : (
          <TaskBarButton text="Leave" onClick={handleLeave}>
            <LogOut size={21} />
          </TaskBarButton>
        )}
        <TaskBarButton
          text={`${connectedUsersCount ? connectedUsersCount : 0} Connected`}
          onClick={handleConnectedUsers}
          style={{ flex: "1 1 0%" }}
        >
          <Dot color="#0DB91B" strokeWidth={"10px"} />
        </TaskBarButton>
        <TaskBarButton text="Settings" onClick={handleSettings}>
          <Settings size={21} />
        </TaskBarButton>
        {isSignedIn ? <UserTab /> : <GoogleSignInButton />}
      </div>
    </div>
  );
};

export default TaskBar;
