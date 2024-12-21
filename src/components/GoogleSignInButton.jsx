import { useGoogleLogin } from "@react-oauth/google";
import { useCollabContext } from "../contexts/CollaborationContext";
import { useAuthContext } from "../contexts/AuthContext";
import supabase from "../lib/supabase";
import * as Y from "yjs";
import { Buffer } from "buffer";

const GoogleSignInButton = () => {
  const { provider, ydoc } = useCollabContext();
  const { userData, handleSignInWithGoogle } = useAuthContext();

  const login = useGoogleLogin({
    onSuccess: () => handleSignIn(),
    onError: () => console.log("Login Failed"),
  });

  const handleSignIn = (response) => {
    const deleteUser = async () => {
      const { data, error } = await supabase.rpc("delete_user", {
        user_id: userData?.id,
      });
      if (error) console.log("Error deleting user: ", error);
      else console.log("User deleted successfully: ", data);
    };
    localStorage.setItem(
      "xeditor-default",
      JSON.stringify(Buffer.from(Y.encodeStateAsUpdate(ydoc.current)))
    );
    provider.destroy();
    deleteUser();
    handleSignInWithGoogle(response);
  };

  return (
    <button
      onClick={() => login()}
      className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-color2 hover:bg-color2 hover:text-color1"
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
