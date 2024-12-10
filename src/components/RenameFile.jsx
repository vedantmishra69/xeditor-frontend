/* eslint-disable react/prop-types */
import { useState } from "react";
import supabase from "../lib/supabase";
import { X } from "lucide-react";

const RenameFile = ({ item, close, updateName }) => {
  const [newName, setNewName] = useState(item.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    const renameFile = async () => {
      const { data, error } = await supabase
        .from("doc_info")
        .update({ name: newName })
        .eq("id", item.id)
        .select("name");
      if (error) console.log("doc name updation error: ", error);
      else {
        updateName(data[0]?.name);
        console.log("doc name successfully updated");
      }
    };
    renameFile();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 p-2 bg-white rounded-lg">
        <div className="justify-end flex">
          <X size={20} onClick={close} />
        </div>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter name..."
          className=" bg-white border border-gray-300 rounded-lg p-2 w-[20vw]"
        />
        <div className="flex flex-row justify-end">
          <button
            type="submit"
            className=" bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default RenameFile;
