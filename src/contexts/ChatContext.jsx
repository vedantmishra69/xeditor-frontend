/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../lib/supabase";
import { useCollabContext } from "./CollaborationContext";
import { logInfo } from "../lib/logging";

const Context = createContext();

const ChatContext = ({ children }) => {
  const [messageList, setMessageList] = useState([]);
  const [channel, setChannel] = useState(null);
  const [isSubbed, setIsSubbed] = useState(false);
  const { docId } = useCollabContext();

  useEffect(() => {
    if (!docId) return;
    const channel = supabase.channel(docId, {
      config: { broadcast: { self: true } },
    });
    setChannel(channel);
  }, [docId]);

  useEffect(() => {
    if (channel)
      channel
        .on("broadcast", { event: "chat" }, (obj) => {
          logInfo(obj.payload);
          setMessageList((list) => [...list, obj.payload]);
        })
        .subscribe((status) => {
          logInfo("CHANNEL ", status);
          if (status !== "SUBSCRIBED") return null;
          setIsSubbed(true);
        });
  }, [channel]);

  const value = {
    messageList,
    channel,
    isSubbed,
    setMessageList,
    setChannel,
    setIsSubbed,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useChatContext = () => useContext(Context);

export default ChatContext;
