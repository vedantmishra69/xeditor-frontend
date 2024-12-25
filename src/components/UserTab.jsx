import { useAuthContext } from "../contexts/AuthContext";
import { colors } from "unique-names-generator";

const UserTab = ({ ...props }) => {
  const { userData, session } = useAuthContext();
  const color =
    userData?.color || colors[Math.floor(Math.random() * colors.length)];
  return (
    <div
      className="relative flex flex-row items-center gap-2 py-2 pl-4 pr-12 border-r-2 border-y-2 border-color2 text-xl hover:bg-color2 hover:text-color1"
      style={{ color: color }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#6272A4";
        e.currentTarget.style.color = "#282A36";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#282A36";
        e.currentTarget.style.color = color;
      }}
      {...props}
    >
      <div>{userData?.name}</div>
      {session?.user?.user_metadata?.avatar_url && (
        <div className="absolute w-8 h-8 bottom-1 right-2 rounded-full overflow-hidden">
          <img
            src={session?.user?.user_metadata?.avatar_url}
            alt="User"
            className="object-cover"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </div>
  );
};

export default UserTab;
