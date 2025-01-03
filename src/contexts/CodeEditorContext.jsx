/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import {
  DEFAULT_CODE,
  DEFAULT_LANGUAGE,
  STATUS_MAPPING,
} from "../lib/constants";
import { fetchResult, getThemeName, submitCode } from "../lib/util";
import { useAuthContext } from "./AuthContext";
import supabase from "../lib/supabase";
import { logError, logInfo } from "../lib/logging";
import toast from "react-hot-toast";

const Context = createContext();

export const CodeEditorContext = ({ children }) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [sourceCode, setSourceCode] = useState(DEFAULT_CODE);
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
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
      if (error) {
        logError("language update error: ", error);
        toast.error("Unable to change language, Please try again.");
      } else {
        logInfo("language updated ", data);
        setLanguage(name);
      }
    };
    changeLanguage();
  };

  const handleSubmit = async () => {
    if (sourceCode && userData) {
      setOutput("");
      const data = await submitCode(language, sourceCode, input, userData);
      if (!data?.error && data?.token) {
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
        } else toast.error("Unable to fetch results.");
      } else toast.error("Unable to submit.");
    }
  };

  useEffect(() => {
    if (!monaco || !userData?.theme) return;
    const setUserTheme = async () => {
      const data = await import(`../lib/themes/${userData.theme}.json`);
      monaco.editor.defineTheme(getThemeName(userData.theme), data);
      monaco.editor.setTheme(getThemeName(userData.theme));
    };
    setUserTheme();
  }, [monaco, userData?.theme]);

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
