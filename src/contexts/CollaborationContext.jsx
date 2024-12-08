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
  const [connectedUsers, setConnectedUsers] = useState(null);
  const [connectedUsersCount, setConnectedUsersCount] = useState(null);
  const [currentFileName, setCurrentFileName] = useState(null);
  const [isDefaultDoc, setIsDefaultDoc] = useState(true);
  const { editor, setLanguage } = useCodeContext();
  const { userData } = useAuthContext();

  const getLocalDoc = () => {
    const doc = localStorage.getItem("xeditor-default");
    if (doc) {
      const obj = JSON.parse(doc);
      return new Uint8Array(obj.data);
    } else return Y.encodeStateAsUpdate(new Y.Doc());
  };

  useEffect(() => {
    const upsertDocInfo = async (docId) => {
      const { data, error } = await supabase
        .from("doc_info")
        .upsert({ id: docId }, { onConflict: "id", ignoreDuplicates: true });
      if (error) console.log("upsert doc info error: ", error);
      else {
        console.log("doc info upserted: ", data);
        setDocId(docId);
      }
    };
    const fetchDocId = async (user_id, y_doc) => {
      const { data, error } = await supabase
        .from("user_docs")
        .select("id")
        .eq("user_id", user_id)
        .eq("is_default", true);
      if (error) console.log("doc check error: ", error);
      else if (data?.length) {
        console.log("doc check data: ", data);
        setDocId(data[0]?.id);
      } else {
        const { data, error } = await supabase
          .from("user_docs")
          .insert({ user_id: user_id, y_doc: y_doc })
          .select("id");
        if (error) console.log("doc insert error: ", error);
        else if (data) {
          console.log("doc inserted: ", data);
          await upsertDocInfo(data[0]?.id);
        }
      }
    };
    if (!userData?.id) return;
    if (!joined) {
      fetchDocId(userData?.id, Buffer.from(getLocalDoc()));
    }
  }, [userData?.id, joined]);

  // useEffect(() => {
  //   const func = async () => {
  //     const { data, error } = await supabase.auth.getUser();
  //     if (error) console.log("Error getting user: ", error);
  //     else {
  //       const date1 = new Date(data.user.last_sign_in_at);
  //       const date2 = new Date(data.user.created_at);
  //       console.log(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 60));
  //       if (Math.abs(date2.getTime() - date1.getTime()) / (1000 * 60) < 1) {
  //         console.log("first time!!");
  //         const doc = localStorage.getItem("xeditor-default");
  //         console.log(doc);
  //         if (doc) {
  //           const obj = JSON.parse(doc);
  //           Y.applyUpdate(ydoc.current, new Uint8Array(obj.data));
  //         }
  //       }
  //     }
  //   };
  //   if (userData?.id && provider) func();
  // }, [userData?.id]);

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
    const fetchFileInfo = async () => {
      const { data, error } = await supabase
        .from("doc_info")
        .select("language,name")
        .eq("id", docId);
      if (error) console.log("language fetch error: ", error);
      else if (data?.[0]?.language) {
        console.log("language fetch: ", data);
        setLanguage(data[0]?.language);
        setCurrentFileName(data[0]?.name);
      }
    };
    if (!docId) return;
    fetchFileInfo();
  }, [docId, setLanguage]);

  useEffect(() => {
    if (!userData?.color || !awareness) return;
    awareness.setLocalStateField("color", userData?.color);
    awareness.setLocalStateField("name", userData?.name);
    awareness.setLocalStateField("id", userData?.id);
  }, [awareness, userData?.color, userData?.name, userData?.id]);

  useEffect(() => {
    if (!awareness) return;
    console.log("AWARENESS SET");
    const stateMap = awareness.getStates();

    awareness.on("update", () => {
      setConnectedUsers(stateMap);
      setConnectedUsersCount(stateMap.size);
    });

    awareness.on("change", ({ added, updated, removed }) => {
      setConnectedUsers(stateMap);
      setConnectedUsersCount(stateMap.size);

      for (const clientId of added) {
        removeCursorStyle(clientId);
        const clientObj = stateMap.get(clientId);
        const styleToAdd = cursorStyle(clientId, clientObj.color);
        document.body.insertAdjacentHTML(
          "beforebegin",
          `<style>${styleToAdd}</style>`
        );
      }

      for (const clientId of updated) {
        removeCursorStyle(clientId);
        const clientObj = stateMap.get(clientId);
        const styleToAdd = cursorStyle(clientId, clientObj.color);
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

  const value = {
    ydoc,
    docId,
    setDocId,
    joined,
    setJoined,
    connectedUsers,
    connectedUsersCount,
    currentFileName,
    isDefaultDoc,
    setIsDefaultDoc,
    provider,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useCollabContext = () => useContext(Context);

export default CollaborationContext;
