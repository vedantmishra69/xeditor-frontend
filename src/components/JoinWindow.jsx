/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import { useAuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { LANGUAGE_MAPPING } from "../lib/constants";
import InputField from "./InputField";
import DefaultButton from "./DefaultButton";
import { useStatesContext } from "../contexts/StatesContext";
import Loader from "./Loader";
import EmptyPlaceholder from "./EmptyPlaceholder";
import { logError, logInfo } from "../lib/logging";
import { useCollabContext } from "../contexts/CollaborationContext";

const JoinWindow = ({ close }) => {
  const [joinToken, setJoinToken] = useState("");
  const [joinHistory, setJoinHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userData } = useAuthContext();
  const { clearConnectionsAndJoin, clearConnectionsAndOpen } =
    useStatesContext();
  const { setMainLoading } = useStatesContext();
  const { docId } = useCollabContext();

  const joinHistoryList = joinHistory?.map((item, index) => (
    <div
      key={index}
      className="flex flex-row justify-between p-2 border-2 border-color1 hover:border-color2 cursor-pointer"
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
    if (data) logInfo("successfully upserted join history: ", data);
    else logError("failed to upsert join history: ", error);
  };

  const handleTokenSubmit = (doc_id) => {
    const checkIfExist = async () => {
      close();
      setMainLoading(true);
      const { data, error } = await supabase
        .from("doc_public_info")
        .select()
        .eq("id", doc_id)
        .single();
      if (data) {
        logInfo("doc id is valid: ", data);
        if (data.user_id === userData?.id) {
          if (doc_id !== docId) clearConnectionsAndOpen(doc_id);
          toast.success("You are the owner of this room.");
        } else {
          await updateJoinHistory(data.id, data.user_id);
          clearConnectionsAndJoin(doc_id);
          toast.success("Room joined successfully.");
        }
      } else {
        toast.error("Invalid join token.");
        logError("document don't exist: ", joinToken, error);
      }
      setMainLoading(false);
    };
    if (!doc_id) return;
    checkIfExist();
  };

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("join_history")
        .select(
          "doc_id,doc_public_info!inner(name,language),user_public_info!inner(name)"
        )
        .eq("joiner_id", userData?.id)
        .order("last_joined_at", { ascending: false });
      if (data) {
        logInfo("join history fetched successfully: ", data);
        setJoinHistory(data);
      } else {
        logError("error in fetching join history: ", error);
        toast.error("Error in fetching join history.");
      }
      setLoading(false);
    };
    if (userData?.id) fetchHistory();
  }, [userData?.id]);

  return (
    <div className="flex flex-col bg-color1 gap-4 rounded-lg">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleTokenSubmit(joinToken);
        }}
      >
        <div className="flex flex-row gap-4">
          <InputField
            value={joinToken}
            onChange={handleJoinToken}
            placeholder="Enter invite token here..."
            style={{
              flex: "1 1 0%",
            }}
          />
          <DefaultButton text="Join" type="submit" />
        </div>
      </form>
      <div className="relative flex flex-col h-[50vh] overflow-y-auto pr-1">
        {loading ? (
          <Loader />
        ) : joinHistory.length ? (
          joinHistoryList
        ) : (
          <EmptyPlaceholder text="No join history" />
        )}
      </div>
    </div>
  );
};
export default JoinWindow;
