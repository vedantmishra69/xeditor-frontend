import Editor from "@monaco-editor/react";
import { HocuspocusProvider } from "@hocuspocus/provider";
import { MonacoBinding } from "y-monaco";
import { useState, useEffect, useRef } from "react";

const EditorComponent = () => {
  const ydoc = useRef(null);
  const [editor, setEditor] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const provider = new HocuspocusProvider({
      url: "ws://127.0.0.1:1234",
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
      height="90vh"
      width="50vw"
      defaultValue="// some comment"
      defaultLanguage="javascript"
      onMount={(editor) => {
        setEditor(editor);
      }}
      theme="vs-dark"
    />
  );
};

export default EditorComponent;
