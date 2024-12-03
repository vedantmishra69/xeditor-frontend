/* eslint-disable react/prop-types */
import { useChatContext } from "../contexts/ChatContext";
import { useCollabContext } from "../contexts/CollaborationContext";
import { X } from "lucide-react";

const OpenFile = ({ close }) => {
  const { userFiles, setDocId } = useCollabContext();
  const { setMessageList } = useChatContext();

  const userFilesList = userFiles?.map((item, index) => (
    <div
      key={index}
      onClick={() => {
        setDocId(item.id);
        setMessageList([]);
        close();
      }}
      className="w-full p-4 hover:bg-gray-100 rounded-lg"
    >
      {item.name}
    </div>
  ));
  return (
    <div className="flex flex-col bg-white p-4 rounded-lg gap-1">
      <div className="justify-end flex">
        <X size={20} onClick={close} />
      </div>
      {userFilesList}
    </div>
  );
};
export default OpenFile;
