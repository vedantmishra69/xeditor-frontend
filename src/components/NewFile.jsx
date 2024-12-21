/* eslint-disable react/prop-types */

import { useState } from "react";
import { DEFAULT_LANGUAGE, LANGUAGE_MAPPING } from "../lib/constants";
import { X } from "lucide-react";
import supabase from "../lib/supabase";
import { useAuthContext } from "../contexts/AuthContext";
import { Buffer } from "buffer";
import * as Y from "yjs";
import { useCollabContext } from "../contexts/CollaborationContext";
import toast from "react-hot-toast";
import { useChatContext } from "../contexts/ChatContext";

const NewFile = ({ close }) => {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [fileName, setFileName] = useState("");
  const { userData } = useAuthContext();
  const { setDocId } = useCollabContext();
  const { setMessageList } = useChatContext();

  const handleCreateFile = () => {
    const createNewFile = async (user_id, y_doc) => {
      const { data, error } = await supabase
        .from("user_docs")
        .insert({ user_id: user_id, y_doc: y_doc, is_default: false })
        .select("id");
      const id = data ? data[0]?.id : null;
      if (error) {
        console.log("New doc creation error: ", error);
        toast.error("Can't add more than 30 documents");
        close();
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
          close();
        }
      } else console.log("id not received");
    };
    if (fileName && userData) {
      createNewFile(
        userData?.id,
        Buffer.from(Y.encodeStateAsUpdate(new Y.Doc()))
      );
    }
  };

  const languageOptions = Object.keys(LANGUAGE_MAPPING).map((name) => (
    <option key={name} value={name}>
      {name}
    </option>
  ));

  return (
    <div className="flex flex-col bg-white gap-4 p-4 rounded-lg">
      <div className="justify-end flex">
        <X size={20} onClick={close} />
      </div>
      <div className="flex flex-row gap-4">
        <input
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="file name"
          className="flex-1 w-[25vw] bg-white border border-gray-300 rounded-lg p-2"
        />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="flex p-3 bg-white border border-gray-300 rounded-lg"
          required
        >
          {languageOptions}
        </select>
      </div>
      <div className="flex flex-row justify-end">
        <button
          onClick={handleCreateFile}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default NewFile;
