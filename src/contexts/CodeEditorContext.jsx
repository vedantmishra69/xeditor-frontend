/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import {
  DEFAULT_CODE,
  DEFAULT_LANGUAGE,
  STATUS_MAPPING,
  THEME_LIST,
} from "../lib/constants";
import { fetchResult, getThemeName, submitCode } from "../lib/util";
import { useAuthContext } from "./AuthContext";
import supabase from "../lib/supabase";

const Context = createContext();

export const CodeEditorContext = ({ children }) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [sourceCode, setSourceCode] = useState(DEFAULT_CODE);
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [themeLoaded, setThemeLoaded] = useState(false);
  const [editor, setEditor] = useState(null);
  const [monaco, setMonaco] = useState(null);
  const { userData } = useAuthContext();

  const handleSetTheme = (theme) => monaco.editor.setTheme(getThemeName(theme));

  const handleLanguageChange = (name, id) => {
    const changeLanguage = async () => {
      const { data, error } = await supabase
        .from("doc_public_info")
        .update({ language: name })
        .eq("id", id);
      if (error) console.log("language update error: ", error);
      else console.log("language updated ", data);
    };
    changeLanguage();
    setLanguage(name);
  };

  const handleSubmit = async () => {
    if (sourceCode && userData) {
      setOutput("");
      const data = await submitCode(language, sourceCode, input, userData);
      if (!data.error && data.token) {
        const result = await fetchResult(data.token);
        if (result) {
          setOutput(
            `${result.stdout + "\n" && result.stdout}${
              (result.compile_output || result.stderr + "\n") &&
              (result.compile_output || result.stderr)
            }\n${
              result.exit_code !== null
                ? `Program finished with exit code ${result.exit_code}.`
                : ""
            }\nStatus: ${STATUS_MAPPING[result.status_id]}\nTime: ${
              result.time
            } s\nMemory: ${result.memory} KB`
          );
        }
      }
    }
  };

  // useEffect(() => {
  //   if (!monaco || !userData) return;
  //   const defineThemes = async () => {
  //     for (const theme in THEME_LIST) {
  //       const data = await import(`../lib/themes/${THEME_LIST[theme]}.json`);
  //       monaco.editor.defineTheme(getThemeName(THEME_LIST[theme]), data);
  //     }
  //     monaco.editor.setTheme(getThemeName(userData.theme));
  //   };
  //   defineThemes();
  // }, [monaco, userData]);

  useEffect(() => {
    if (!monaco) return;
    const defineThemes = async () => {
      for (const theme in THEME_LIST) {
        const data = await import(`../lib/themes/${THEME_LIST[theme]}.json`);
        monaco.editor.defineTheme(getThemeName(THEME_LIST[theme]), data);
      }
      setThemeLoaded(true);
    };
    defineThemes();
  }, [monaco]);

  useEffect(() => {
    if (!monaco || !userData?.theme || !themeLoaded) return;
    monaco.editor.setTheme(getThemeName(userData?.theme));
  }, [monaco, userData?.theme, themeLoaded]);

  const value = {
    sourceCode,
    setSourceCode,
    language,
    setLanguage,
    handleLanguageChange,
    editor,
    setEditor,
    monaco,
    setMonaco,
    handleSetTheme,
    handleSubmit,
    input,
    setInput,
    output,
    setOutput,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useCodeContext = () => useContext(Context);

export default CodeEditorContext;
