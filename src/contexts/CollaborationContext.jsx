/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { HocuspocusProvider } from "@hocuspocus/provider";
import { MonacoBinding } from "y-monaco";
import { useState, useEffect, useRef, createContext, useContext } from "react";
import { SOCKET_URL } from "../lib/constants";
import { useCodeContext } from "./CodeEditorContext";
import { useAuthContext } from "./AuthContext";

const Context = createContext();

const CollaborationContext = ({ children }) => {
  const ydoc = useRef(null);
  const [provider, setProvider] = useState(null);
  const { docName } = useAuthContext();
  const { editor } = useCodeContext();
  const { userData } = useAuthContext();

  useEffect(() => {
    console.log("doc", docName);
    const provider = new HocuspocusProvider({
      url: `${SOCKET_URL}/collab/doc`,
      name: docName,
    });
    setProvider(provider);
    ydoc.current = provider.document;
    const awareness = provider.awareness;
    awareness.setLocalStateField("color", userData?.color);
    const stateMap = awareness.getStates();
    awareness.on("change", ({ added }) => {
      for (const clientId of added) {
        const color = stateMap.get(clientId).color;
        const styleToAdd = `
          .yRemoteSelection-${clientId} {
            background-color: ${color};
          }
          .yRemoteSelectionHead-${clientId} {
            position: absolute;
            border-left: ${color} solid 2px;
            border-top: ${color} solid 2px;
            border-bottom: ${color} solid 2px;
            height: 100%;
            box-sizing: border-box;
          }
          .yRemoteSelectionHead-${clientId}::after {
            position: absolute;
            content: " ";
            border: 3px solid ${color};
            border-radius: 4px;
            left: -4px;
            top: -5px;
          }
        `;
        document.body.insertAdjacentHTML(
          "beforebegin",
          `<style>${styleToAdd}</style>`
        );
      }
    });

    return () => {
      provider.destroy();
      ydoc.current.destroy();
    };
  }, [docName, userData?.color]);

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
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useCollabContext = () => useContext(Context);

export default CollaborationContext;
