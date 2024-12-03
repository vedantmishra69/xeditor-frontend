/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useRef, useState } from "react";
import supabase from "../lib/supabase";
import { generateUUID, getRandomColor, getRandomName } from "../lib/util";

const Context = createContext(null);

const AuthContext = ({ children }) => {
  const [docName, setDocName] = useState(generateUUID());
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const prevData = useRef(null);

  const handleSignInWithGoogle = async (response) => {
    try {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: response.credential,
      });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error while signing in:", error.message);
      throw error;
    }
  };

  const signInAnon = async () => {
    try {
      const { data, error } = await supabase.auth.signInAnonymously();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error signing in anonymously:", error.message);
      throw error;
    }
  };

  const initializeValues = async (session) => {
    try {
      if (!session?.user?.id) return;
      const { data, error } = await supabase.rpc("upsert_user_info", {
        p_id: session.user.id,
        p_name: session.user.user_metadata?.full_name || getRandomName(),
        p_color: getRandomColor(),
      });

      if (error) throw error;
      if (JSON.stringify(prevData.current) !== JSON.stringify(data)) {
        prevData.current = data;
        setUserData(data);
        console.log("INITIALIZED");
      }
    } catch (error) {
      console.error("Error initializing user values:", error.message);
    }
  };

  useEffect(() => {
    const handleAuthStateChange = (event, session) => {
      console.log(event);

      switch (event) {
        case "INITIAL_SESSION": {
          setIsLoading(true);
          if (!session) {
            setTimeout(async () => {
              await signInAnon();
              setIsLoading(false);
            }, 0);
          } else {
            setIsSignedIn(!session.user.is_anonymous);
            setTimeout(async () => {
              await initializeValues(session);
              setIsLoading(false);
            }, 0);
          }
          break;
        }
        case "SIGNED_IN": {
          setIsSignedIn(!session.user.is_anonymous);
          setTimeout(async () => {
            await initializeValues(session);
          }, 0);
          break;
        }
        case "SIGNED_OUT": {
          setIsSignedIn(false);
          setUserData(null);
          setTimeout(async () => {
            await signInAnon();
          }, 0);
          break;
        }
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    docName,
    setDocName,
    supabase,
    isSignedIn,
    isLoading,
    handleSignInWithGoogle,
    userData,
    setUserData,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(Context);
  if (context === null) {
    throw new Error(
      "useAuthContext must be used within an AuthContext provider"
    );
  }
  return context;
};

export default AuthContext;
