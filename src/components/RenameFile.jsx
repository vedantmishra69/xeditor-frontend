/* eslint-disable react/prop-types */
import { useState } from "react";
import supabase from "../lib/supabase";
import InputField from "./InputField";
import DefaultButton from "./DefaultButton";
import { logError, logInfo } from "../lib/logging";
import toast from "react-hot-toast";

const RenameFile = ({ item, updateName }) => {
  const [newName, setNewName] = useState(item.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    const renameFile = async () => {
      const { data, error } = await supabase
        .from("doc_public_info")
        .update({ name: newName })
        .eq("id", item.id)
        .select("name");
      if (error) {
        logError("doc name updation error: ", error);
        toast.error("Error in renaming file, Please try again.");
      } else {
        updateName(data[0]?.name);
        logInfo("doc name successfully updated");
      }
    };
    if (newName.length > 0 && newName.length <= 50) renameFile();
    else toast.error("length of file name should between 1 and 50.");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 bg-color1">
        <InputField
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter name..."
        />
        <div className="flex flex-row justify-end">
          <DefaultButton text="Save" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default RenameFile;
