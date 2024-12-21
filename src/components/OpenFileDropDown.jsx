import { ChevronDown, Edit3, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCollabContext } from "../contexts/CollaborationContext";
import { useCodeContext } from "../contexts/CodeEditorContext";
import { LANGUAGE_MAPPING } from "../lib/constants";
import supabase from "../lib/supabase";
import { useAuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import RenameFile from "./RenameFile";
import DeleteConfirmation from "./DeleteConfirmation";

const OpenFileDropDown = () => {
  const [isDropDown, setIsDropDown] = useState(false);
  const { currentFileName } = useCollabContext();
  const { language } = useCodeContext();

  const [userFiles, setUserFiles] = useState(null);
  const { setDocId, setIsDefaultDoc, setCurrentFileName, docId } =
    useCollabContext();
  const { userData } = useAuthContext();
  const item = useRef(null);
  const currentIndex = useRef(null);
  const defaultDocId = useRef(null);
  const dropdownRef = useRef(null);

  const [renameFileOpen, setRenameFileOpen] = useState(false);
  const [deleteFileOpen, setDeleteFileOpen] = useState(false);

  const displayFileName =
    currentFileName &&
    language &&
    currentFileName + LANGUAGE_MAPPING[language]?.extension;

  const handleDropDown = () => setIsDropDown(!isDropDown);

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
        className="flex flex-row px-2 py-1 hover:bg-color2 hover:text-color1 justify-between"
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
              className="text-slate-400 hover:text-color4"
              onClick={() => {
                item.current = obj;
                currentIndex.current = index;
                setRenameFileOpen(true);
              }}
            />
            <Trash2
              className="ml-2 text-slate-400 hover:text-color4"
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
        .from("doc_public_info")
        .select("id, name, user_docs!inner(is_default)")
        .eq("user_docs.user_id", user_id);

      if (error) console.log("fetch files error: ", error);
      else {
        console.log("fetched files: ", data);
        setUserFiles(data);
      }
    };
    if (!isDropDown) return;
    if (!userData?.id) return;
    fetchFiles(userData.id);
  }, [userData?.id, isDropDown]);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setIsDropDown(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

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
      <div
        ref={dropdownRef}
        className={
          "w-56 relative flex flex-row items-center justify-between py-2 pl-4 pr-2 border-r-2 border-y-2 border-color2 text-xl" +
          (isDropDown ? "" : " hover:bg-color2 hover:text-color1")
        }
        onClick={handleDropDown}
      >
        <div className="truncate text-clip">{displayFileName}</div>
        <div
          className={
            (isDropDown ? "rotate-180" : "") +
            " transition-transform duration-500"
          }
        >
          <ChevronDown />
        </div>
        {isDropDown && (
          <div className="max-h-60 text-start text-lg absolute top-14 -inset-x-10 flex flex-col border-2 border-color2 overflow-scroll">
            {userFilesList}
          </div>
        )}
      </div>
    </>
  );
};

export default OpenFileDropDown;
