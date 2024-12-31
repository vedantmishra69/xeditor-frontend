import { useAuthContext } from "../contexts/AuthContext";
import { logError, logInfo } from "../lib/logging";
import supabase from "../lib/supabase";

const GoogleSignInButton = () => {
  const { userData, handleSignInWithGoogleCustom } = useAuthContext();

  const handleSignIn = () => {
    const deleteUser = async () => {
      const { data, error } = await supabase.rpc("delete_user", {
        user_id: userData?.id,
      });
      if (error) logError("Error deleting user: ", error);
      else {
        logInfo("User deleted successfully: ", data);
        await handleSignInWithGoogleCustom();
      }
    };
    deleteUser();
  };

  return (
    <button
      onClick={() => handleSignIn()}
      className="flex items-center justify-center gap-2 px-4 py-2 border-y-2 border-r-2 border-color2 hover:bg-color2 hover:text-color1"
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        className="w-5 h-5"
      />
      <span className="text-xl">Sign in</span>
    </button>
  );
};

export default GoogleSignInButton;
