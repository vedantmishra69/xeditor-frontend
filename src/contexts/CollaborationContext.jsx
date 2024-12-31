/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { HocuspocusProvider } from "@hocuspocus/provider";
import { MonacoBinding } from "y-monaco";
import { useState, useEffect, useRef, createContext, useContext } from "react";
import { DEFAULT_CODE_BUFFER, SOCKET_URL } from "../lib/constants";
import { cursorStyle, removeCursorStyle } from "../lib/util";
import { useCodeContext } from "./CodeEditorContext";
import { useAuthContext } from "./AuthContext";
import supabase from "../lib/supabase";
import * as Y from "yjs";
import { IndexeddbPersistence } from "y-indexeddb";
import { logError, logInfo } from "../lib/logging";
import toast from "react-hot-toast";

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
  const [isDefaultDoc, setIsDefaultDoc] = useState(true); // might remove this
  const { editor, setLanguage } = useCodeContext();
  const { userData, session } = useAuthContext();

  useEffect(() => {
    const upsertDocInfo = async (doc_Id) => {
      const { data, error } = await supabase
        .from("doc_public_info")
        .upsert({ id: doc_Id }, { onConflict: "id", ignoreDuplicates: true });
      if (error) {
        logError("upsert doc info error: ", error);
        toast.error("Error in doc fetching, Please try again");
      } else {
        logInfo("doc info upserted: ", data);
        setDocId(doc_Id);
      }
    };
    const fetchDocId = async (user_id) => {
      logInfo("in fetchDocId with user id: ", session.user.id);
      const { data, error } = await supabase
        .from("user_docs")
        .select("id")
        .eq("user_id", user_id)
        .eq("is_default", true);
      if (error) {
        logError("doc check error: ", error);
        toast.error("Error in doc fetching, Please try again");
      } else if (data?.length) {
        logInfo("doc check data: ", data);
        setDocId(data[0]?.id);
      } else {
        const { data, error } = await supabase
          .from("user_docs")
          .insert({
            user_id: user_id,
            y_doc: DEFAULT_CODE_BUFFER,
          })
          .select("id");
        if (error) {
          logError("doc insert error: ", error);
          toast.error("Error in doc fetching, Please try again");
        } else if (data) {
          logInfo("doc inserted: ", data);
          await upsertDocInfo(data[0]?.id);
        }
      }
    };
    if (!session?.user?.id) return;
    if (!docId) {
      fetchDocId(session?.user?.id);
    }
  }, [session?.user?.id, docId]);

  useEffect(() => {
    if (!docId || !session?.access_token) return;
    const provider = new HocuspocusProvider({
      url: `${SOCKET_URL}/collab/doc`,
      name: docId,
      document: new Y.Doc(),
      token: "Bearer " + session.access_token,
    });
    logInfo("PROVIDER SET :", docId);
    ydoc.current = provider.document;
    if (session?.user?.is_anonymous && !joined) {
      const offlineProvider = new IndexeddbPersistence(
        "xeditor-default",
        ydoc.current
      );
      offlineProvider.on("synced", () => logInfo("OFFLINE PERSISTENCE SET"));
    }
    setProvider(provider);
    setAwareness(provider.awareness);

    return () => {
      provider.destroy();
      provider.awareness.destroy();
    };
  }, [docId, session?.access_token, session?.user?.is_anonymous, joined]);

  useEffect(() => {
    const fetchFileInfo = async () => {
      const { data, error } = await supabase
        .from("doc_public_info")
        .select("language,name")
        .eq("id", docId);
      if (error) {
        logError("file info fetch error: ", error);
        toast.error("Error in fetching file details, Please try again.");
      } else if (data?.[0]?.language) {
        logInfo("language fetch: ", data);
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
    logInfo("AWARENESS SET");
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
      editor?.getModel(),
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
    setCurrentFileName,
    isDefaultDoc,
    setIsDefaultDoc,
    provider,
    awareness,
    setProvider,
    setAwareness,
    setConnectedUsers,
    setConnectedUsersCount,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useCollabContext = () => useContext(Context);

export default CollaborationContext;
