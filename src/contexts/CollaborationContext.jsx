/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { HocuspocusProvider } from "@hocuspocus/provider";
import { MonacoBinding } from "y-monaco";
import { useState, useEffect, useRef, createContext, useContext } from "react";
import { SOCKET_URL } from "../lib/constants";
import { cursorStyle, removeCursorStyle } from "../lib/util";
import { useCodeContext } from "./CodeEditorContext";
import { useAuthContext } from "./AuthContext";
import supabase from "../lib/supabase";
import { Buffer } from "buffer";
import * as Y from "yjs";

const Context = createContext();

const CollaborationContext = ({ children }) => {
  const ydoc = useRef(null);
  const [docId, setDocId] = useState(null);
  const [provider, setProvider] = useState(null);
  const [awareness, setAwareness] = useState(null);
  const [joined, setJoined] = useState(false);
  const { editor } = useCodeContext();
  const { userData } = useAuthContext();

  useEffect(() => {
    const fetchDocId = async (user_id) => {
      const { data, error } = await supabase
        .from("user_docs")
        .select("id")
        .eq("user_id", user_id);
      if (error) console.log("doc id fetch error: ", error);
      else {
        console.log("DOC ID: ", data[0]?.id);
        return data[0]?.id;
      }
    };

    const upsertDoc = async (user_id, y_doc) => {
      const { data, error } = await supabase
        .from("user_docs")
        .upsert(
          { user_id: user_id, y_doc: y_doc },
          { onConflict: "user_id", ignoreDuplicates: true }
        );

      if (error) console.log("upsert error: ", error);
      else {
        console.log("upsert data: ", data);
        setDocId(await fetchDocId(user_id));
      }
    };
    if (!userData?.id) return;
    if (!joined) {
      upsertDoc(userData?.id, Buffer.from(Y.encodeStateAsUpdate(new Y.Doc())));
    }
  }, [userData?.id, joined]);

  useEffect(() => {
    if (!docId) return;
    const provider = new HocuspocusProvider({
      url: `${SOCKET_URL}/collab/doc`,
      name: docId,
      document: new Y.Doc(),
    });
    console.log("PROVIDER SET :", provider);
    ydoc.current = provider.document;
    setProvider(provider);
    setAwareness(provider.awareness);

    return () => {
      provider.destroy();
      provider.awareness.destroy();
    };
  }, [docId]);

  useEffect(() => {
    if (!userData?.color || !awareness) return;
    awareness.setLocalStateField("color", userData?.color);
  }, [awareness, userData?.color]);

  useEffect(() => {
    if (!awareness) return;
    console.log("AWARENESS SET");
    const stateMap = awareness.getStates();

    awareness.on("change", ({ added }) => {
      for (const clientId of added) {
        removeCursorStyle(clientId);

        const color = stateMap.get(clientId).color;
        const styleToAdd = cursorStyle(clientId, color);
        document.body.insertAdjacentHTML(
          "beforebegin",
          `<style>${styleToAdd}</style>`
        );
      }
    });

    awareness.on("change", ({ updated, removed }) => {
      for (const clientId of updated) {
        removeCursorStyle(clientId);

        const color = stateMap.get(clientId).color;
        const styleToAdd = cursorStyle(clientId, color);
        document.body.insertAdjacentHTML(
          "beforebegin",
          `<style>${styleToAdd}</style>`
        );
      }

      for (const clientId of removed) {
        removeCursorStyle(clientId);
      }
    });

    return () => {
      const allClientIds = Array.from(stateMap.keys());
      allClientIds.forEach(removeCursorStyle);
    };
  }, [awareness]);

  useEffect(() => {
    if (provider == null || editor == null || !ydoc.current) {
      return;
    }
    const binding = new MonacoBinding(
      ydoc.current.getText(),
      editor.getModel(),
      new Set([editor]),
      provider?.awareness
    );
    return () => {
      binding.destroy();
    };
  }, [provider, editor]);

  const value = { docId, setDocId, joined, setJoined };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useCollabContext = () => useContext(Context);

export default CollaborationContext;
