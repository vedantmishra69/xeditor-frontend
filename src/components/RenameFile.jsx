/* eslint-disable react/prop-types */
import { useState } from "react";
import supabase from "../lib/supabase";
import InputField from "./InputField";
import DefaultButton from "./DefaultButton";

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
      <div className="flex flex-col gap-4 bg-color1">
        <InputField
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter name..."
          style={{ "font-size": "1.125rem", "line-height": "1.75rem" }}
        />
        <div className="flex flex-row justify-end">
          <DefaultButton
            text="Save"
            type="submit"
            style={{ "font-size": "1.125rem", "line-height": "1.75rem" }}
          />
        </div>
      </div>
    </form>
  );
};

export default RenameFile;
