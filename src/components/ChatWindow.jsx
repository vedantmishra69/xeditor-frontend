import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useChatContext } from "../contexts/ChatContext";

const ChatWindow = () => {
  const { messageList, channel, isSubbed } = useChatContext();
  const [input, setInput] = useState("");
  const { name, color } = useAuthContext();

  const messageBoxList = messageList?.map((item, index) => (
    <div key={index} className="w-full my-1">
      <span style={{ color: item.color }}>{item.user.replace("_", " ")}</span>
      {`: ${item.message}`}
    </div>
  ));

  const handleInput = (e) => setInput(e.target.value);

  const handleSend = () => {
    if (isSubbed) {
      channel.send({
        type: "broadcast",
        event: "test",
        payload: { user: name, message: input, color: color },
      });
      setInput("");
    }
  };

  return (
    <div className="flex flex-col w-full h-[50vh] p-4">
      <div className="flex-1 flex flex-col">{messageBoxList}</div>
      <div className="mt-auto flex flex-row w-full gap-2">
        <input
          className="flex-1 bg-white border border-gray-300 rounded-lg p-2"
          placeholder="Enter message here..."
          type="text"
          value={input}
          onChange={handleInput}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
