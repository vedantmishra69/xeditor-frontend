/* eslint-disable react/prop-types */

import { useState } from "react";
import { DEFAULT_LANGUAGE, LANGUAGE_MAPPING } from "../lib/constants";
import supabase from "../lib/supabase";
import { useAuthContext } from "../contexts/AuthContext";
import { Buffer } from "buffer";
import * as Y from "yjs";
import toast from "react-hot-toast";
import InputField from "./InputField";
import DropDownMenuButton from "./DropDownMenuButton";
import DefaultButton from "./DefaultButton";
import { useStatesContext } from "../contexts/StatesContext";
import { logError, logInfo } from "../lib/logging";

const NewFile = ({ close }) => {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [fileName, setFileName] = useState("");
  const { userData } = useAuthContext();
  const { setMainLoading, clearConnectionsAndOpen } = useStatesContext();

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
        logError("New doc creation error: ", error);
        toast.error(
          "Error in adding document or can't add more than 30 documents."
        );
      } else if (id) {
        const { data, error } = await supabase.from("doc_public_info").insert({
          id: id,
          name: fileName,
          language: language,
        });
        if (error) {
          logError("insert new doc info error: ", error);
          toast.error("Unable to create file, Please try again");
        } else {
          logInfo("new doc info inserted: ", data);
          toast.success("New file created successfully");
          clearConnectionsAndOpen(id);
        }
      } else {
        logError("id not received");
        toast.error("Error in adding document, Please try again");
      }
      setMainLoading(false);
    };
    if (fileName && userData) {
      if (fileName.length > 0 && fileName.length <= 50)
        createNewFile(
          userData?.id,
          Buffer.from(Y.encodeStateAsUpdate(new Y.Doc()))
        );
      else toast.error("length of file name should between 1 and 50.");
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
