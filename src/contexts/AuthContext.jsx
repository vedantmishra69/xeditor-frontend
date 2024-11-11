/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../lib/supabase";
import { generateUUID, getRandomName } from "../lib/util";
import randomColor from "randomcolor";

const Context = createContext();

const AuthContext = ({ children }) => {
  const [docName, setDocName] = useState(generateUUID());
  const [session, setSession] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleSignInWithGoogle = async (response) => {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: response.credential,
    });
    if (error) console.log("Error while signing in: ", error);
    else console.log("Sign in successful: ", data);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log("Error signing out: ", error);
  };

  const signInAnon = async () => {
    const { data, error } = await supabase.auth.signInAnonymously();
    console.log(data);
    if (error) console.log(error);
  };

  const initializeValues = async (session) => {
    const { data, error } = await supabase.rpc("upsert_user_info", {
      p_id: session.user.id,
      p_name: getRandomName(),
      p_color: randomColor(),
    });
    setUserData(data);
    console.log("initialized");
    if (error) console.log(error);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      console.log("here1");
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log("here2", _event);
      if (_event === "INITIAL_SESSION") {
        if (!session) signInAnon();
        else initializeValues(session);
      }
      if (_event === "SIGNED_OUT") {
        signInAnon();
      }
      if (_event === "SIGNED_IN") {
        initializeValues(session);
      }
    });
  }, []);

  const value = {
    docName,
    setDocName,
    supabase,
    isSignedIn,
    handleSignInWithGoogle,
    handleSignOut,
    userData,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useAuthContext = () => useContext(Context);

export default AuthContext;
