/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useRef, useState } from "react";
import supabase from "../lib/supabase";
import { getRandomColor, getRandomName } from "../lib/util";

const Context = createContext(null);

const AuthContext = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isFirstSignIn, setIsFirstSignIn] = useState(false);
  const [session, setSession] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const prevData = useRef(null);

  const handleSignInWithGoogleCustom = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

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

  const setIsFirstSignInFunction = async (user) => {
    const date1 = new Date(user.last_sign_in_at);
    const date2 = new Date(user.created_at);
    if (Math.abs(date2.getTime() - date1.getTime()) / (1000 * 60) < 1) {
      console.log("first time!!");
      setIsFirstSignIn(true);
    }
  };

  useEffect(() => {
    const handleAuthStateChange = (event, session) => {
      console.log(event);
      setSession(session);

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
              await setIsFirstSignInFunction(session.user);
              setIsLoading(false);
            }, 0);
          }
          break;
        }
        case "SIGNED_IN": {
          setIsSignedIn(!session.user.is_anonymous);
          setTimeout(async () => {
            await initializeValues(session);
            await setIsFirstSignInFunction(session.user);
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
    session,
    isSignedIn,
    isLoading,
    handleSignInWithGoogle,
    handleSignInWithGoogleCustom,
    userData,
    setUserData,
    isFirstSignIn,
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
