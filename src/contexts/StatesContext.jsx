/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useCollabContext } from "./CollaborationContext";
import { useAuthContext } from "./AuthContext";
import { useChatContext } from "./ChatContext";
import { useCodeContext } from "./CodeEditorContext";
import toast from "react-hot-toast";
import supabase from "../lib/supabase";

const Context = createContext();
const connectionToastId = toast.loading("Connecting...");
const editorToastId = toast.loading("Editor loading...");

const StatesContext = ({ children }) => {
  const [userConnected, setUserConnected] = useState(false);
  const [docConnection, setDocConnection] = useState(false);
  const [editorSetup, setEditorSetup] = useState(false);
  const [chatConnection, setChatConnection] = useState(false);

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [fileListOpen, setFileListOpen] = useState(false);
  const [userListOpen, setUserListOpen] = useState(false);
  const [newFileOpen, setNewFileOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);

  const [mainLoading, setMainLoading] = useState(true);
  const [codeSubmitLoading, setCodeSubmitLoading] = useState(false);

  const { userData } = useAuthContext();
  const { isSubbed, setMessageList, setChannel, setIsSubbed } =
    useChatContext();
  const {
    ydoc,
    docId,
    currentFileName,
    provider,
    awareness,
    setProvider,
    setAwareness,
    setConnectedUsers,
    setConnectedUsersCount,
    setCurrentFileName,
    setIsDefaultDoc,
    setDocId,
    setJoined,
  } = useCollabContext();
  const { editor, monaco, setInput, setOutput } = useCodeContext();

  const clearCodeEditorPage = () => {
    setInput("");
    setOutput("");
    setMessageList([]);
  };

  const clearConnections = () => {
    ydoc.current.destroy();
    clearCodeEditorPage();
    setProvider(null);
    setAwareness(null);
    setConnectedUsers(null);
    setConnectedUsersCount(null);
    setCurrentFileName(null);
    supabase.removeAllChannels();
    setChannel(null);
    setIsSubbed(false);
  };

  const clearConnectionsAndOpenDefault = () => {
    setDocId(null);
    setJoined(false);
    setIsDefaultDoc(true);
    clearConnections();
  };

  const clearConnectionsAndJoin = (docId) => {
    clearConnections();
    setDocId(docId);
    setJoined(true);
    setIsDefaultDoc(false);
  };

  const clearConnectionsAndOpen = (docId) => {
    setDocId(docId);
    setJoined(false);
    clearConnections();
  };

  const clearChat = () => setMessageList([]);
  const clearInput = () => setInput("");
  const clearOutput = () => setOutput("");

  useEffect(() => {
    if (ydoc && docId && provider && awareness && currentFileName)
      setDocConnection(true);
  }, [awareness, currentFileName, docId, provider, ydoc]);

  useEffect(() => {
    if (userData) setUserConnected(true);
  }, [userData]);

  useEffect(() => {
    if (isSubbed) setChatConnection(true);
  }, [isSubbed]);

  useEffect(() => {
    if (editor && monaco) setEditorSetup(true);
  }, [editor, monaco]);

  useEffect(() => {
    if (docConnection && chatConnection && userConnected)
      toast.success("Connected!", { id: connectionToastId, duration: 1000 });
  }, [docConnection, chatConnection, userConnected]);

  useEffect(() => {
    if (docConnection && chatConnection && userConnected && editorSetup) {
      setMainLoading(false);
    }
  }, [docConnection, chatConnection, userConnected, editorSetup]);

  useEffect(() => {
    if (editorSetup)
      toast.success("Editor loaded", { id: editorToastId, duration: 1000 });
  }, [editorSetup]);

  const value = {
    userConnected,
    docConnection,
    editorSetup,
    chatConnection,
    settingsOpen,
    setSettingsOpen,
    userListOpen,
    setUserListOpen,
    newFileOpen,
    setNewFileOpen,
    joinOpen,
    setJoinOpen,
    clearInput,
    clearOutput,
    clearChat,
    clearCodeEditorPage,
    fileListOpen,
    setFileListOpen,
    codeSubmitLoading,
    setCodeSubmitLoading,
    mainLoading,
    setMainLoading,
    clearConnectionsAndOpenDefault,
    clearConnectionsAndJoin,
    clearConnectionsAndOpen,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useStatesContext = () => useContext(Context);

export default StatesContext;
