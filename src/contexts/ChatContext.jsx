/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import supabase from "../lib/supabase";

const Context = createContext();

const ChatContext = ({ children }) => {
  const [messageList, setMessageList] = useState([]);
  const [channel, setChannel] = useState(null);
  const [isSubbed, setIsSubbed] = useState(false);
  const { docName } = useAuthContext();

  useEffect(() => {
    const channel = supabase.channel(docName, {
      config: { broadcast: { self: true } },
    });
    setChannel(channel);
  }, [docName]);

  useEffect(() => {
    if (channel)
      channel
        .on("broadcast", { event: "test" }, (obj) => {
          console.log(obj.payload);
          setMessageList((list) => [...list, obj.payload]);
        })
        .subscribe((status) => {
          if (status !== "SUBSCRIBED") return null;
          setIsSubbed(true);
          console.log("subbed");
        });
  }, [channel]);

  const value = { messageList, channel, isSubbed, setMessageList };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useChatContext = () => useContext(Context);

export default ChatContext;
