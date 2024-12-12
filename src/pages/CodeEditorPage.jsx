import { useState } from "react";
import { useCodeContext } from "../contexts/CodeEditorContext";
import { LANGUAGE_MAPPING, STATUS_MAPPING } from "../lib/constants";
import { Download, Settings as SettingsIcon } from "lucide-react";
import { copyToClipboard, fetchResult, submitCode } from "../lib/util";
import CodeEditor from "../components/CodeEditor";
import toast from "react-hot-toast";
import ChatWindow from "../components/ChatWindow";
import { useAuthContext } from "../contexts/AuthContext";
import { useChatContext } from "../contexts/ChatContext";
import { GoogleLogin } from "@react-oauth/google";
import Settings from "../components/Settings";
import { useCollabContext } from "../contexts/CollaborationContext";
import UserList from "../components/UserList";
import supabase from "../lib/supabase";
import NewFile from "../components/NewFile";
import OpenFile from "../components/OpenFile";
import * as Y from "yjs";
import { Buffer } from "buffer";
import JoinWindow from "../components/JoinWindow";

const CodeEditorPage = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [time, setTime] = useState("");
  const [memory, setMemory] = useState("");
  const [status, setStatus] = useState("");
  const { language, setLanguage, sourceCode } = useCodeContext();
  const { setMessageList } = useChatContext();
  const { handleSignInWithGoogle, isSignedIn, userData } = useAuthContext();
  const { ydoc, docId, joined, setJoined, currentFileName, provider } =
    useCollabContext();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [userListOpen, setUserListOpen] = useState(false);
  const [newFileOpen, setNewFileOpen] = useState(false);
  const [fileListOpen, setFileListOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);

  const clearInput = () => setInput("");

  const clearOutput = () => {
    setOutput("");
    setTime("");
    setMemory("");
    setStatus("");
  };

  const clearChats = () => setMessageList([]);

  const clearCodeEditorPage = () => {
    clearInput();
    clearOutput();
    clearChats();
  };

  const handleInput = (e) => setInput(e.target.value);

  const handleSignIn = (response) => {
    const deleteUser = async () => {
      const { data, error } = await supabase.rpc("delete_user", {
        user_id: userData?.id,
      });
      if (error) console.log("Error deleting user: ", error);
      else console.log("User deleted successfully: ", data);
    };
    localStorage.setItem(
      "xeditor-default",
      JSON.stringify(Buffer.from(Y.encodeStateAsUpdate(ydoc.current)))
    );
    provider.destroy();
    deleteUser();
    handleSignInWithGoogle(response);
  };

  const handleSignOut = () => {
    const signOut = async () => {
      const { error } = await supabase.auth.signOut();
      if (error) console.log("error signing out: ", error);
      else clearCodeEditorPage();
    };
    signOut();
  };
  const handleLanguage = (name) => {
    const changeLanguage = async () => {
      const { data, error } = await supabase
        .from("doc_public_info")
        .update({ language: name })
        .eq("id", docId);
      if (error) console.log("language update error: ", error);
      else console.log("language updated ", data);
    };
    changeLanguage();
    setLanguage(name);
  };

  const handleSubmit = async () => {
    if (sourceCode && userData) {
      clearOutput();
      const data = await submitCode(language, sourceCode, input, userData);
      if (!data.error && data.token) {
        const result = await fetchResult(data.token);
        console.log(data.token);
        if (result) {
          setOutput(
            `${result.stdout + "\n" && result.stdout}${
              (result.compile_output || result.stderr + "\n") &&
              (result.compile_output || result.stderr)
            }\n${
              result.exit_code !== null
                ? `Program finished with exit code ${result.exit_code}.`
                : ""
            }`
          );
          setTime(result.time);
          setMemory(result.memory);
          setStatus(result.status_id);
        }
      }
    }
  };

  const handleLeave = () => {
    setJoined(false);
    setMessageList([]);
    toast.success("Room left successfully.");
  };

  const handleSettings = () => {
    setSettingsOpen(true);
  };

  const handleInvite = async () => {
    const response = await copyToClipboard(docId);
    toast.success(response.message);
  };

  const handleNew = () => {
    if (!isSignedIn)
      toast.success(
        "Sign in to create multiple files and access it across devices."
      );
    else setNewFileOpen(true);
  };

  const handleOpenFiles = () => {
    if (!isSignedIn)
      toast.success(
        "Sign in to create multiple files and access it across devices."
      );
    else setFileListOpen(true);
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

  const languageOptions = [];
  for (const name in LANGUAGE_MAPPING) {
    languageOptions.push(
      <option key={name} value={name}>
        {name}
      </option>
    );
  }

  return (
    <div className="min-h-screen w-full flex justify-between items-center">
      {fileListOpen && (
        <div className="fixed inset-0 z-10 flex justify-center items-center backdrop-brightness-50">
          <OpenFile close={() => setFileListOpen(false)} />
        </div>
      )}
      {newFileOpen && (
        <div className="fixed inset-0 z-10 flex justify-center items-center backdrop-brightness-50">
          <NewFile
            close={() => setNewFileOpen(false)}
            languageOptions={languageOptions}
          />
        </div>
      )}
      {userListOpen && (
        <div className="fixed inset-0 z-10 flex justify-center items-center backdrop-brightness-50">
          <UserList close={() => setUserListOpen(false)} />
        </div>
      )}
      {settingsOpen && (
        <div className="fixed inset-0 z-10 flex justify-center items-center backdrop-brightness-50">
          <Settings close={() => setSettingsOpen(false)} />
        </div>
      )}
      {joinOpen && (
        <div className="fixed inset-0 z-10 flex justify-center items-center backdrop-brightness-50">
          <JoinWindow
            clearCodeEditorPage={clearCodeEditorPage}
            close={() => setJoinOpen(false)}
          />
        </div>
      )}
      <div className="min-h-screen w-full bg-gray-100 flex flex-row justify-between">
        <div className="flex-1 flex flex-col gap-4 p-4">
          <div className="flex flex-row gap-4">
            <button
              onClick={handleNew}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
            >
              New
            </button>
            <button
              onClick={handleOpenFiles}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
            >
              Open
            </button>
            {currentFileName &&
              currentFileName + LANGUAGE_MAPPING[language].extension}

            <button
              onClick={handleDownload}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
            >
              <Download />
            </button>
          </div>
          <div className="flex-1 flex justify-center">
            <CodeEditor />
          </div>
          <div className="flex-1">
            <ChatWindow open={() => setUserListOpen(true)} />
          </div>
        </div>
        <div className="flex-1 h-screen flex flex-col p-4">
          <div className="w-full flex flex-row gap-2 mb-2">
            <button
              onClick={handleInvite}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
            >
              Invite
            </button>

            {joined ? (
              <button
                onClick={handleLeave}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
              >
                Leave
              </button>
            ) : (
              <button
                onClick={() => setJoinOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
              >
                Join
              </button>
            )}
            <button
              onClick={handleSettings}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
            >
              <SettingsIcon />
            </button>
            {isSignedIn && userData?.name ? (
              <div className="flex flex-row gap-2">
                <div className="text-xl font-semibold">{userData.name}</div>
                <button
                  onClick={handleSignOut}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <GoogleLogin
                onSuccess={handleSignIn}
                onError={() => {
                  console.log("Login Failed");
                }}
                context="signin"
                ux_mode="popup"
                type="standard"
                shape="rectangular"
                theme="outline"
                text="signin"
                size="large"
                logo_alignment="left"
                use_fedcm_for_prompt
              />
            )}
          </div>
          <div className="flex-1 space-y-4 flex flex-col">
            <div className="flex-1 w-full max-w-3xl flex flex-col">
              <label className="block text-gray-700 font-semibold mb-2">
                Input
              </label>
              <textarea
                value={input}
                onChange={handleInput}
                className="w-full flex-1 p-2 bg-white border border-gray-300 resize-none rounded-lg"
                placeholder="Provide input if needed..."
              ></textarea>
            </div>

            <div className="flex-1 w-full max-w-3xl flex flex-col">
              <div className="flex flex-row justify-between">
                <label className="text-gray-700 font-semibold mb-2">
                  Output
                </label>
                <div
                  className={
                    (status === 3 ? "text-green-500" : "text-red-500") +
                    " font-semibold mb-2"
                  }
                >
                  {STATUS_MAPPING[status]}
                </div>
              </div>
              <textarea
                value={output}
                className="w-full flex-1 p-2 bg-white border border-gray-300 resize-none rounded-lg"
                placeholder="Output will be displayed here..."
                readOnly
              ></textarea>
            </div>
          </div>
          <div className="w-full flex flex-row p-2 gap-2">
            <div>{time ? `Time: ${time}s` : ""}</div>
            <div>{memory ? `Memory: ${memory}kB` : ""}</div>
          </div>
          <div className="mt-auto w-full max-w-3xl">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => handleLanguage(e.target.value)}
                className="w-full p-3 bg-white border border-gray-300 rounded-lg"
                required
              >
                {languageOptions}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorPage;
