/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useCollabContext } from "./CollaborationContext";
import { useAuthContext } from "./AuthContext";
import { useChatContext } from "./ChatContext";
import { useCodeContext } from "./CodeEditorContext";
import toast from "react-hot-toast";

const Context = createContext();
const connectionToastId = toast.loading("Connecting...");
const editorToastId = toast.loading("Editor loading...");

const StatesContext = ({ children }) => {
  const [userConnected, setUserConnected] = useState(false);
  const [docConnection, setDocConnection] = useState(false);
  const [editorSetup, setEditorSetup] = useState(false);
  const [chatConnection, setChatConnection] = useState(false);
  const { userData } = useAuthContext();
  const { isSubbed } = useChatContext();
  const { ydoc, docId, currentFileName, provider, awareness } =
    useCollabContext();
  const { editor, monaco } = useCodeContext();

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
    if (editorSetup)
      toast.success("Editor loaded", { id: editorToastId, duration: 1000 });
  }, [editorSetup]);

  const value = [userConnected, docConnection, editorSetup, chatConnection];

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useStatesContext = () => useContext(Context);

export default StatesContext;
