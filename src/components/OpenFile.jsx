/* eslint-disable react/prop-types */
import { useCollabContext } from "../contexts/CollaborationContext";
import { X, Trash2, Edit3 } from "lucide-react";
import supabase from "../lib/supabase";
import toast from "react-hot-toast";
import { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import RenameFile from "./RenameFile";
import DeleteConfirmation from "./DeleteConfirmation";

const OpenFile = ({ close }) => {
  const [userFiles, setUserFiles] = useState(null);
  const { setDocId, setIsDefaultDoc, setCurrentFileName, docId } =
    useCollabContext();
  const { userData } = useAuthContext();
  const item = useRef(null);
  const currentIndex = useRef(null);
  const defaultDocId = useRef(null);

  const [renameFileOpen, setRenameFileOpen] = useState(false);
  const [deleteFileOpen, setDeleteFileOpen] = useState(false);

  const deleteFileName = (confirm) => {
    const deleteFile = async () => {
      const response = await supabase
        .from("user_docs")
        .delete()
        .eq("id", item.current.id);
      if (response.status >= 200) {
        console.log(item.current.name + " Deleted");
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
        if (item.current.id === docId) setDocId(defaultDocId.current);
        toast.success("File deleted successfully");
      } else console.log("Error deleting ", item.current.name);
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
        className="flex flex-row w-[20vw] p-4 hover:bg-gray-100 rounded-lg justify-between"
      >
        <div
          className="flex-1"
          onClick={() => {
            setDocId(obj.id);
            setIsDefaultDoc(obj.user_docs.is_default);
            close();
          }}
        >
          {obj.name}
        </div>
        {!obj.user_docs.is_default && (
          <div className="flex flex-row">
            <Edit3
              color="#cccaca"
              onClick={() => {
                item.current = obj;
                currentIndex.current = index;
                setRenameFileOpen(true);
              }}
            />
            <Trash2
              className="ml-2"
              color="#cccaca"
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
    <>
      {renameFileOpen && (
        <div className="fixed inset-0 z-10 flex justify-center items-center backdrop-brightness-50">
          <RenameFile
            item={item.current}
            updateName={updateName}
            close={() => setRenameFileOpen(false)}
          />
        </div>
      )}
      {deleteFileOpen && (
        <div className="fixed inset-0 z-10 flex justify-center items-center backdrop-brightness-50">
          <DeleteConfirmation
            deleteFileName={deleteFileName}
            close={() => setDeleteFileOpen(false)}
          />
        </div>
      )}
      <div className="flex flex-col bg-white p-4 rounded-lg gap-1">
        <div className="justify-end flex">
          <X size={20} onClick={close} />
        </div>
        {userFilesList}
      </div>
    </>
  );
};
export default OpenFile;
