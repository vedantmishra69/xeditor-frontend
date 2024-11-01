/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { DEFAULT_CODE, DEFAULT_LANGUAGE } from "../lib/constants";

const Context = createContext();

export const CodeEditorContext = ({ children }) => {
  const [sourceCode, setSourceCode] = useState(DEFAULT_CODE);
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [editor, setEditor] = useState(null);

  const value = {
    sourceCode,
    setSourceCode,
    language,
    setLanguage,
    editor,
    setEditor,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useCodeContext = () => useContext(Context);

export default CodeEditorContext;
