import Editor from "@monaco-editor/react";
import { LANGUAGE_MAPPING } from "../lib/constants";
import { useCodeContext } from "../contexts/CodeEditorContext";

const CodeEditor = () => {
  const { language, sourceCode, setSourceCode, setEditor, setMonaco } =
    useCodeContext();

  return (
    <Editor
      language={LANGUAGE_MAPPING[language].monacoLanguage}
      value={sourceCode}
      onChange={(value) => setSourceCode(value)}
      onMount={(editor) => setEditor(editor)}
      beforeMount={(monaco) => setMonaco(monaco)}
    />
  );
};

export default CodeEditor;
