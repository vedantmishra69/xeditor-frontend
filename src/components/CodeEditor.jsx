import Editor from "@monaco-editor/react";
import { LANGUAGE_MAPPING } from "../lib/constants";
import { useCodeContext } from "../contexts/CodeEditorContext";
import { useAuthContext } from "../contexts/AuthContext";

const CodeEditor = () => {
  const { language, sourceCode, setSourceCode, setEditor, setMonaco } =
    useCodeContext();
  const { userData } = useAuthContext();

  const options = {
    tabSize: userData?.tab_size,
    fontSize: userData?.font_size,
    wordWrap: userData?.word_wrap ? "on" : "off",
  };

  return (
    language && (
      <Editor
        language={LANGUAGE_MAPPING[language].monacoLanguage}
        value={sourceCode}
        onChange={(value) => setSourceCode(value)}
        onMount={(editor) => setEditor(editor)}
        beforeMount={(monaco) => setMonaco(monaco)}
        options={options}
      />
    )
  );
};

export default CodeEditor;
