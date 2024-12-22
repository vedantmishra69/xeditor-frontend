/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import { useAuthContext } from "../contexts/AuthContext";
import { useCollabContext } from "../contexts/CollaborationContext";
import toast from "react-hot-toast";
import { LANGUAGE_MAPPING } from "../lib/constants";
import InputField from "./InputField";
import DefaultButton from "./DefaultButton";

const JoinWindow = ({ clearCodeEditorPage, close }) => {
  const [joinToken, setJoinToken] = useState("");
  const [joinHistory, setJoinHistory] = useState([]);
  const { setDocId, setJoined } = useCollabContext();
  const { userData } = useAuthContext();

  const joinHistoryList = joinHistory?.map((item, index) => (
    <div
      key={index}
      className="flex flex-row justify-between p-2 border-2 border-color1 hover:border-color2"
      onClick={() => handleTokenSubmit(item.doc_id)}
    >
      <div className="">{`${item.doc_public_info.name}${
        LANGUAGE_MAPPING[item.doc_public_info.language].extension
      }`}</div>
      <div className="text-slate-400">{`${item.user_public_info.name}`}</div>
    </div>
  ));

  const handleJoinToken = (e) => setJoinToken(e.target.value);

  const updateJoinHistory = async (doc_id, owner_id) => {
    const { data, error } = await supabase
      .from("join_history")
      .upsert(
        {
          doc_id: doc_id,
          joiner_id: userData?.id,
          owner_id: owner_id,
          last_joined_at: new Date().toISOString(),
        },
        { onConflict: "doc_id, joiner_id, owner_id", ignoreDuplicates: false }
      )
      .select();
    if (data) console.log("successfully upserted join history: ", data);
    else console.log("failed to upsert join history: ", error);
  };

  const handleTokenSubmit = (doc_id) => {
    const checkIfExist = async () => {
      const { data, error } = await supabase
        .from("doc_public_info")
        .select()
        .eq("id", doc_id)
        .single();
      if (data) {
        console.log("doc id is valid: ", data);
        await updateJoinHistory(data.id, data.user_id);
        setDocId(data.id);
        setJoined(true);
        clearCodeEditorPage();
        close();
        toast.success("Room joined successfully.");
      } else {
        toast.error("Invalid join token.");
        console.log("document don't exist: ", joinToken, error);
      }
    };
    if (!doc_id) return;
    checkIfExist();
  };

  useEffect(() => {
    const fetchHistory = async () => {
      const { data, error } = await supabase
        .from("join_history")
        .select(
          "doc_id,doc_public_info!inner(name,language),user_public_info!inner(name)"
        )
        .eq("joiner_id", userData?.id)
        .order("last_joined_at", { ascending: false });
      if (data) {
        console.log("join history fetched successfully: ", data);
        setJoinHistory(data);
      } else console.log(error);
    };
    if (userData?.id) fetchHistory();
  }, [userData?.id]);

  return (
    <div className="flex flex-col bg-color1 gap-2 rounded-lg">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleTokenSubmit(joinToken);
        }}
      >
        <div className="flex flex-row gap-2">
          <InputField
            value={joinToken}
            onChange={handleJoinToken}
            placeholder="Enter invote token here..."
            style={{
              "font-size": "1.125rem",
              "line-height": "1.75rem",
              flex: "1 1 0%",
            }}
          />
          <DefaultButton
            text="Join"
            type="submit"
            style={{ "font-size": "1.125rem", "line-height": "1.75rem" }}
          />
        </div>
      </form>
      <div className="flex flex-col max-h-[50vh] overflow-y-auto pr-1">
        {joinHistoryList}
      </div>
    </div>
  );
};
export default JoinWindow;
