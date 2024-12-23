import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useChatContext } from "../contexts/ChatContext";
import InputField from "./InputField";
import DefaultButton from "./DefaultButton";
import { Trash2 } from "lucide-react";

const ChatWindow = () => {
  const { messageList, setMessageList, channel, isSubbed } = useChatContext();
  const [input, setInput] = useState("");
  const { userData } = useAuthContext();

  const messageBoxList = messageList?.map((item, index) => (
    <div key={index} className="w-full my-1">
      <span style={{ color: item.color }}>{item.user}</span>
      {`: ${item.message}`}
    </div>
  ));

  const clear = () => setMessageList([]);

  const handleInput = (e) => setInput(e.target.value);

  const handleSend = (e) => {
    e.preventDefault();
    if (isSubbed && input) {
      channel.send({
        type: "broadcast",
        event: "chat",
        payload: {
          user: userData?.name,
          message: input,
          color: userData?.color,
        },
      });
      setInput("");
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row relative justify-center py-1 border-b-2 border-color2 text-lg">
        <span>Chat</span>
        <Trash2
          className="absolute right-2 text-slate-400 hover:text-color4"
          onClick={clear}
        />
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto p-2 ">
        {messageBoxList}
      </div>
      <form
        onSubmit={handleSend}
        className="mt-auto flex flex-row w-full gap-2 p-2"
      >
        <InputField
          value={input}
          onChange={handleInput}
          placeholder="Enter message here..."
          style={{ flex: "1 1 0%" }}
        />
        <DefaultButton type="submit" text="Send" style={{ flex: "0 0 auto" }} />
      </form>
    </div>
  );
};

export default ChatWindow;
