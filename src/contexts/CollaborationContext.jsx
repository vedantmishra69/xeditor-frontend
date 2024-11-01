/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { HocuspocusProvider } from "@hocuspocus/provider";
import { MonacoBinding } from "y-monaco";
import { useState, useEffect, useRef, createContext, useContext } from "react";
import { SOCKET_URL } from "../lib/constants";
import { useCodeContext } from "./CodeEditorContext";
import { generateUUID } from "../lib/util";

const Context = createContext();

const CollaborationContext = ({ children }) => {
  const ydoc = useRef(null);
  const [provider, setProvider] = useState(null);
  const [docName, setDocName] = useState(generateUUID());
  const { editor } = useCodeContext();

  useEffect(() => {
    console.log("doc", docName);
    const provider = new HocuspocusProvider({
      url: `${SOCKET_URL}/collab`,
      name: docName,
    });
    setProvider(provider);
    ydoc.current = provider.document;
    return () => {
      provider.destroy();
      ydoc.current.destroy();
    };
  }, [docName]);

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

  const value = {
    ydoc,
    provider,
    setProvider,
    docName,
    setDocName,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useCollabContext = () => useContext(Context);

export default CollaborationContext;
