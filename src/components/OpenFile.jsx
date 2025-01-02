/* eslint-disable react/prop-types */
import { useCollabContext } from "../contexts/CollaborationContext";
import { Trash2, Edit3 } from "lucide-react";
import supabase from "../lib/supabase";
import toast from "react-hot-toast";
import { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import RenameFile from "./RenameFile";
import DeleteConfirmation from "./DeleteConfirmation";
import PopupBox from "./PopupBox";
import Loader from "./Loader";
import { logError, logInfo } from "../lib/logging";
import { useStatesContext } from "../contexts/StatesContext";

const OpenFile = ({ close }) => {
  const [userFiles, setUserFiles] = useState(null);
  const { setIsDefaultDoc, setCurrentFileName, docId } = useCollabContext();
  const { userData } = useAuthContext();
  const { clearConnectionsAndOpenDefault, clearConnectionsAndOpen } =
    useStatesContext();
  const item = useRef(null);
  const currentIndex = useRef(null);
  const defaultDocId = useRef(null);

  const [renameFileOpen, setRenameFileOpen] = useState(false);
  const [deleteFileOpen, setDeleteFileOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteFileName = (confirm) => {
    const deleteFile = async () => {
      const response = await supabase
        .from("user_docs")
        .delete()
        .eq("id", item.current.id);
      if (response.status >= 200) {
        logInfo(item.current.name + " Deleted");
        setUserFiles((list) => {
          const newList = [];
          for (const index in list) {
            const obj = list[index];
            if (index == currentIndex.current) {
              continue;
            }
            newList.push(obj);
          }
          return newList;
        });
        if (item.current.id === docId) clearConnectionsAndOpenDefault();
        toast.success("File deleted successfully");
      } else {
        logError("Error deleting ", item.current.name);
        toast.error("Error in deleting file, Please try again");
      }
    };
    if (confirm) deleteFile();
    setDeleteFileOpen(false);
  };

  const updateName = (name) => {
    setUserFiles((list) => {
      const newList = [];
      for (const index in list) {
        const obj = list[index];
        if (index == currentIndex.current) {
          obj.name = name;
        }
        newList.push(obj);
      }
      return newList;
    });
    if (item.current.id === docId) setCurrentFileName(name);
    toast.success("Name changed successfully");
    setRenameFileOpen(false);
  };

  const userFilesList = userFiles?.map((obj, index) => {
    if (obj.user_docs.is_default === true) defaultDocId.current = obj.id;

    return (
      <div
        key={index}
        className="flex flex-row p-2 border-2 border-color1 hover:border-color2 cursor-pointer justify-between"
      >
        <div
          className="flex-1"
          onClick={() => {
            setIsDefaultDoc(obj.user_docs.is_default);
            if (obj.id !== docId) clearConnectionsAndOpen(obj.id);
            close();
          }}
        >
          {obj.name}
        </div>
        {!obj.user_docs.is_default && (
          <div className="flex flex-row">
            <Edit3
              className="text-slate-400 hover:text-color4"
              onClick={() => {
                item.current = obj;
                currentIndex.current = index;
                setRenameFileOpen(true);
              }}
            />
            <Trash2
              className="text-slate-400 hover:text-color4 ml-2"
              onClick={() => {
                item.current = obj;
                currentIndex.current = index;
                setDeleteFileOpen(true);
              }}
            />
          </div>
        )}
      </div>
    );
  });

  useEffect(() => {
    const fetchFiles = async (user_id) => {
      setLoading(true);
      const { data, error } = await supabase
        .from("doc_public_info")
        .select("id, name, user_docs!inner(is_default)")
        .eq("user_docs.user_id", user_id);

      if (error) {
        logError("fetch files error: ", error);
        toast.error("Error in fetching files, Please try again.");
      } else {
        logInfo("fetched files: ", data);
        setUserFiles(data);
      }
      setLoading(false);
    };
    if (!userData?.id) return;
    fetchFiles(userData.id);
  }, [userData?.id]);

  return (
    <>
      {renameFileOpen && (
        <div className="fixed inset-0 z-10 flex justify-center items-center backdrop-brightness-50">
          <PopupBox name="Rename File" close={() => setRenameFileOpen(false)}>
            <RenameFile
              item={item.current}
              updateName={updateName}
              close={() => setRenameFileOpen(false)}
            />
          </PopupBox>
        </div>
      )}
      {deleteFileOpen && (
        <div className="fixed inset-0 z-10 flex justify-center items-center backdrop-brightness-50">
          <PopupBox name="Delete File" close={() => setDeleteFileOpen(false)}>
            <DeleteConfirmation
              deleteFileName={deleteFileName}
              close={() => setDeleteFileOpen(false)}
            />
          </PopupBox>
        </div>
      )}
      <div className="relative flex flex-col text-lg px-1 bg-color1 h-[50vh] overflow-y-auto">
        {loading ? <Loader /> : userFilesList}
      </div>
    </>
  );
};
export default OpenFile;
