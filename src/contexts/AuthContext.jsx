/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";
import supabase from "../lib/supabase";
import { generateUUID, getRandomColor } from "../lib/util";
import randomColor from "randomcolor";

const Context = createContext();

const AuthContext = ({ children }) => {
  const [name, setName] = useState(
    uniqueNamesGenerator({ dictionaries: [adjectives, animals] })
  );
  const [color, setColor] = useState(randomColor());
  const [docName, setDocName] = useState(generateUUID());
  const [session, setSession] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

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

  const initializeValues = (session) => {
    if (session) {
      setIsSignedIn(true);
      setName(session.user.user_metadata.full_name);
    } else {
      setIsSignedIn(false);
      setName(uniqueNamesGenerator({ dictionaries: [adjectives, animals] }));
    }
  };

  const value = {
    name,
    docName,
    setDocName,
    supabase,
    color,
    isSignedIn,
    handleSignInWithGoogle,
    handleSignOut,
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      initializeValues(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      initializeValues(session);
    });
  }, []);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useAuthContext = () => useContext(Context);

export default AuthContext;
