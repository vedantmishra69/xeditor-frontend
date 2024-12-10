/* eslint-disable react/prop-types */
import { X } from "lucide-react";

const DeleteConfirmation = ({ close, deleteFileName }) => {
  return (
    <div className="flex flex-col bg-white gap-2 p-2 w-[30vw] rounded-lg">
      <div className="justify-end flex">
        <X size={20} onClick={close} />
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex flex-row justify-center">
          <p>Are you sure?</p>
        </div>
        <div className="flex flex-row justify-evenly">
          <button
            className=" bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
            onClick={() => deleteFileName(true)}
          >
            Yes
          </button>
          <button
            className=" bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
            onClick={() => deleteFileName(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteConfirmation;
