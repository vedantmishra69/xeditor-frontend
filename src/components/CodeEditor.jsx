import Editor from "@monaco-editor/react";
import {
  DEFAULT_FONT_SIZE,
  DEFAULT_TAB_SIZE,
  DEFAULT_WORD_WRAP,
  LANGUAGE_MAPPING,
} from "../lib/constants";
import { useCodeContext } from "../contexts/CodeEditorContext";
import { useAuthContext } from "../contexts/AuthContext";

const CodeEditor = () => {
  const { language, sourceCode, setSourceCode, setEditor, setMonaco } =
    useCodeContext();
  const { userData } = useAuthContext();

  const options = {
    tabSize: userData?.tab_size || DEFAULT_TAB_SIZE,
    fontSize: userData?.font_size || DEFAULT_FONT_SIZE,
    wordWrap: (userData?.word_wrap ? "on" : "off") || DEFAULT_WORD_WRAP,
  };

  return (
    <Editor
      language={LANGUAGE_MAPPING[language].monacoLanguage}
      value={sourceCode}
      onChange={(value) => setSourceCode(value)}
      onMount={(editor) => setEditor(editor)}
      beforeMount={(monaco) => setMonaco(monaco)}
      options={options}
      theme="vs-dark"
    />
  );
};

export default CodeEditor;
