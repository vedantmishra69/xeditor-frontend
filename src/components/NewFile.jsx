/* eslint-disable react/prop-types */

import { useState } from "react";
import { DEFAULT_LANGUAGE, LANGUAGE_MAPPING } from "../lib/constants";
import supabase from "../lib/supabase";
import { useAuthContext } from "../contexts/AuthContext";
import { Buffer } from "buffer";
import * as Y from "yjs";
import { useCollabContext } from "../contexts/CollaborationContext";
import toast from "react-hot-toast";
import { useChatContext } from "../contexts/ChatContext";
import InputField from "./InputField";
import DropDownMenuButton from "./DropDownMenuButton";
import DefaultButton from "./DefaultButton";
import { useStatesContext } from "../contexts/StatesContext";

const NewFile = ({ close }) => {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [fileName, setFileName] = useState("");
  const { userData } = useAuthContext();
  const { setDocId, setJoined } = useCollabContext();
  const { setMessageList } = useChatContext();
  const { setMainLoading } = useStatesContext();

  const handleCreateFile = () => {
    const createNewFile = async (user_id, y_doc) => {
      close();
      setMainLoading(true);
      const { data, error } = await supabase
        .from("user_docs")
        .insert({ user_id: user_id, y_doc: y_doc, is_default: false })
        .select("id");
      const id = data ? data[0]?.id : null;
      if (error) {
        console.log("New doc creation error: ", error);
        toast.error("Can't add more than 30 documents");
      } else if (id) {
        const { data, error } = await supabase.from("doc_public_info").insert({
          id: id,
          name: fileName,
          language: language,
        });
        if (error) console.log("insert new doc info error: ", error);
        else {
          console.log("new doc info inserted: ", data);
          toast.success("New file created successfully");
          setDocId(id);
          setMessageList([]);
          setJoined(false);
        }
      } else console.log("id not received");
      setMainLoading(false);
    };
    if (fileName && userData) {
      createNewFile(
        userData?.id,
        Buffer.from(Y.encodeStateAsUpdate(new Y.Doc()))
      );
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg">
      <div className="flex flex-row gap-4">
        <InputField
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="file name"
        />
        <DropDownMenuButton
          value={language}
          onChange={setLanguage}
          options={Object.keys(LANGUAGE_MAPPING)}
          style={{
            borderLeftColor: "#6272A4",
            borderLeftWidth: "2px",
            fontSize: "1.125rem",
            lineHeight: "1.75rem",
          }}
        />
      </div>
      <div className="flex flex-row justify-end">
        <DefaultButton onClick={handleCreateFile} text="Create" />
      </div>
    </div>
  );
};

export default NewFile;
