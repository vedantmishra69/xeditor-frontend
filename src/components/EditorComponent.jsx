import Editor from "@monaco-editor/react";
import { HocuspocusProvider } from "@hocuspocus/provider";
import { MonacoBinding } from "y-monaco";
import { useState, useEffect, useRef } from "react";
import { LANGUAGE_MAPPING, SOCKET_URL } from "../lib/constants";
import { useCodeContext } from "../contexts/CodeEditorContext";

const EditorComponent = () => {
  const ydoc = useRef(null);
  const [editor, setEditor] = useState(null);
  const [provider, setProvider] = useState(null);
  const { language, sourceCode } = useCodeContext();

  useEffect(() => {
    const provider = new HocuspocusProvider({
      url: `${SOCKET_URL}/collab`,
      name: "example-document",
    });
    setProvider(provider);
    ydoc.current = provider.document;
    return () => {
      provider.destroy();
      ydoc.current.destroy();
    };
  }, []);

  useEffect(() => {
    if (provider == null || editor == null) {
      return;
    }
    console.log("reached", provider);
    const binding = new MonacoBinding(
      ydoc.current.getText(),
      editor.getModel(),
      new Set([editor]),
      provider?.awareness
    );
    return () => {
      binding.destroy();
    };
  }, [ydoc, provider, editor]);

  return (
    <Editor
      language={LANGUAGE_MAPPING[language].monacoLanguage}
      value={sourceCode}
      onMount={(editor) => {
        setEditor(editor);
      }}
      theme="vs-dark"
    />
  );
};

export default EditorComponent;
