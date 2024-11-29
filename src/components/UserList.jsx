import { useCollabContext } from "../contexts/CollaborationContext";
import { X } from "lucide-react";

const UserList = ({ close }) => {
  const list = ["user1", "user2", "user3"];
  const { connectedUsers } = useCollabContext();
  const userList = [];
  for (const [key, item] of connectedUsers) {
    console.log(item);
    userList.push(
      <div key={key} className={"border-2 border-gray-100 p-2 rounded-lg"}>
        <span style={{ color: item.color }}>{item.name}</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col bg-white p-2 rounded-lg gap-2">
      <div className="justify-end flex">
        <X size={20} onClick={close} />
      </div>
      {userList}
    </div>
  );
};

export default UserList;
