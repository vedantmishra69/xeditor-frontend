/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import { DEFAULT_CODE, DEFAULT_LANGUAGE, THEME_LIST } from "../lib/constants";
import { getThemeName } from "../lib/util";
import { useAuthContext } from "./AuthContext";

const Context = createContext();

export const CodeEditorContext = ({ children }) => {
  const [sourceCode, setSourceCode] = useState(DEFAULT_CODE);
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [editor, setEditor] = useState(null);
  const [monaco, setMonaco] = useState(null);
  const { userData } = useAuthContext();

  const handleSetTheme = (theme) => monaco.editor.setTheme(getThemeName(theme));

  useEffect(() => {
    if (!monaco || !userData) return;
    const defineThemes = async () => {
      for (const theme in THEME_LIST) {
        const data = await import(`../lib/themes/${THEME_LIST[theme]}.json`);
        monaco.editor.defineTheme(getThemeName(THEME_LIST[theme]), data);
      }
      monaco.editor.setTheme(getThemeName(userData.theme));
    };
    defineThemes();
  }, [monaco, userData]);

  const value = {
    sourceCode,
    setSourceCode,
    language,
    setLanguage,
    editor,
    setEditor,
    monaco,
    setMonaco,
    handleSetTheme,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useCodeContext = () => useContext(Context);

export default CodeEditorContext;
