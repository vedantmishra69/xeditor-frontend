/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { HocuspocusProvider } from "@hocuspocus/provider";
import { MonacoBinding } from "y-monaco";
import { useState, useEffect, useRef, createContext, useContext } from "react";
import { SOCKET_URL } from "../lib/constants";
import { useCodeContext } from "./CodeEditorContext";
import { useAuthContext } from "./AuthContext";
import supabase from "../lib/supabase";
import * as Y from "yjs";
import { Buffer } from "buffer";

const Context = createContext();

const CollaborationContext = ({ children }) => {
  const ydoc = useRef(null);
  const [provider, setProvider] = useState(null);
  const { editor } = useCodeContext();
  const { userData } = useAuthContext();

  useEffect(() => {
    const upsertDoc = async (user_id, y_doc) => {
      const { data, error } = await supabase
        .from("user_docs")
        .upsert(
          { user_id: user_id, y_doc_json: y_doc },
          { onConflict: "user_id", ignoreDuplicates: true }
        );
      if (error) console.log("e2", error);
      else console.log("d2", data);
    };

    if (!userData) return;
    const provider = new HocuspocusProvider({
      url: `${SOCKET_URL}/collab/doc`,
      name: userData.id,
      token: userData.id,
    });
    console.log("PROVIDER SET");
    setProvider(provider);
    ydoc.current = provider.document;
    upsertDoc(
      userData.id,
      Buffer.from(Y.encodeStateAsUpdate(provider.document))
    );
    console.log(ydoc.current);
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
  }, [userData]);

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
