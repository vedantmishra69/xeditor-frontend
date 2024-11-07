import Editor from "@monaco-editor/react";
import { LANGUAGE_MAPPING } from "../lib/constants";
import { useCodeContext } from "../contexts/CodeEditorContext";

const CodeEditor = () => {
  const { language, sourceCode, setSourceCode, setEditor } = useCodeContext();

  const handleSourceCode = (value) => setSourceCode(value);

  return (
    <Editor
      language={LANGUAGE_MAPPING[language].monacoLanguage}
      value={sourceCode}
      onChange={handleSourceCode}
      onMount={(editor) => {
        setEditor(editor);
      }}
      theme=""
    />
  );
};

export default CodeEditor;
