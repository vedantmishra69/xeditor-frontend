/* eslint-disable react/prop-types */
import { useCollabContext } from "../contexts/CollaborationContext";
import { X, Trash2 } from "lucide-react";
import supabase from "../lib/supabase";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";

const OpenFile = ({ close }) => {
  const [userFiles, setUserFiles] = useState(null);
  const { setDocId, setIsDefaultDoc } = useCollabContext();
  const { userData } = useAuthContext();

  const deleteFile = (item) => {
    return new Promise((res, rej) => {
      supabase
        .from("user_docs")
        .delete()
        .eq("id", item.id)
        .then((response) => {
          if (response.status >= 200) res(item.name + " Deleted");
          else rej("Error deleting");
        })
        .catch((error) => rej(error));
    });
  };

  const userFilesList = userFiles?.map((item, index) => (
    <div
      key={index}
      onClick={() => {
        setDocId(item.id);
        setIsDefaultDoc(item.user_docs.is_default);
        close();
      }}
      className="flex flex-row w-[20vw] p-4 hover:bg-gray-100 rounded-lg justify-between"
    >
      {item.name}
      {/* <Trash2
        color="#cacaca"
        onClick={() => {
          toast.promise(deleteFile(item), {
            loading: "Deleting...",
            success: <b>Deleted!</b>,
            error: <b>Could not delete.</b>,
          });
        }}
      /> */}
    </div>
  ));

  useEffect(() => {
    const fetchFiles = async (user_id) => {
      const { data, error } = await supabase
        .from("doc_info")
        .select("id, name, user_docs!inner(is_default)")
        .eq("user_docs.user_id", user_id);

      if (error) console.log("fetch files error: ", error);
      else {
        console.log("fetched files: ", data);
        setUserFiles(data);
      }
    };
    if (!userData?.id) return;
    fetchFiles(userData.id);
  }, [userData?.id]);

  return (
    <div className="flex flex-col bg-white p-4 rounded-lg gap-1">
      <div className="justify-end flex">
        <X size={20} onClick={close} />
      </div>
      {userFilesList}
    </div>
  );
};
export default OpenFile;
