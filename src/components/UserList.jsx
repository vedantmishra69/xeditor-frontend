import { useAuthContext } from "../contexts/AuthContext";
import { useCollabContext } from "../contexts/CollaborationContext";
import { logInfo } from "../lib/logging";

const UserList = () => {
  const { connectedUsers } = useCollabContext();
  const { userData } = useAuthContext();
  const userList = [];
  logInfo("Connected users: ", connectedUsers);
  for (const [key, item] of connectedUsers) {
    userList.push(
      <div key={key} className={"p-2 flex flex-row justify-between"}>
        <span style={{ color: item.color }} className="text-lg">
          {item.name}
        </span>
        {userData?.id === item?.id && (
          <span className="text-slate-400 text-lg">{"(You)"}</span>
        )}
      </div>
    );
  }
  return (
    <div className="flex flex-col bg-color1 rounded-lg max-h-[50vh] overflow-y-auto cursor-default">
      {userList}
    </div>
  );
};

export default UserList;
