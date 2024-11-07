/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";
import supabase from "../lib/supabase";
import { generateUUID, getRandomColor } from "../lib/util";

const Context = createContext();

const AuthContext = ({ children }) => {
  const [name, setName] = useState(
    uniqueNamesGenerator({ dictionaries: [adjectives, animals] })
  );
  const [color, setColor] = useState(getRandomColor());
  const [docName, setDocName] = useState(generateUUID());

  const value = { name, docName, setDocName, supabase, color };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useAuthContext = () => useContext(Context);

export default AuthContext;
