/* eslint-disable react/prop-types */
import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useChatContext } from "../contexts/ChatContext";
import { useCollabContext } from "../contexts/CollaborationContext";
import { User } from "lucide-react";
import { ChevronDown } from "lucide-react";

const ChatWindow = ({ open }) => {
  const { messageList, channel, isSubbed } = useChatContext();
  const [input, setInput] = useState("");
  const { userData } = useAuthContext();
  const { connectedUsersCount } = useCollabContext();

  const messageBoxList = messageList?.map((item, index) => (
    <div key={index} className="w-full my-1">
      <span style={{ color: item.color }}>{item.user}</span>
      {`: ${item.message}`}
    </div>
  ));

  const handleInput = (e) => setInput(e.target.value);

  const handleSend = (e) => {
    e.preventDefault();
    if (isSubbed && input) {
      channel.send({
        type: "broadcast",
        event: "test",
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
    <div className="flex flex-col w-full h-[40vh]">
      {connectedUsersCount ? (
        <div className="flex flex-row justify-end">
          <div
            className="flex flex-row items-center bg-white px-2 py-1 rounded-md hover:bg-gray-200"
            onClick={open}
          >
            <span className="text-lg mr-1">{connectedUsersCount}</span>
            <User size={17} />
            <ChevronDown size={13} />
          </div>
        </div>
      ) : null}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {messageBoxList}
      </div>
      <form
        onSubmit={handleSend}
        className="mt-auto flex flex-row w-full gap-2"
      >
        <input
          className="flex-1 bg-white border border-gray-300 rounded-lg p-2"
          placeholder="Enter message here..."
          type="text"
          value={input}
          onChange={handleInput}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
