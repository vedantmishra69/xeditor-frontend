/* eslint-disable react/prop-types */
import DefaultButton from "./DefaultButton";

const DeleteConfirmation = ({ deleteFileName }) => {
  return (
    <div className="flex flex-col bg-color1 gap-2">
      <div className="flex flex-col gap-10">
        <div className="flex flex-row justify-center">
          <p className="text-2xl">Are you sure?</p>
        </div>
        <div className="flex flex-row justify-evenly">
          <DefaultButton
            text="Yes"
            onClick={() => deleteFileName(true)}
            style={{ "font-size": "1.125rem", "line-height": "1.75rem" }}
          />
          <DefaultButton
            text="No"
            onClick={() => deleteFileName(false)}
            style={{ "font-size": "1.125rem", "line-height": "1.75rem" }}
          />
        </div>
      </div>
    </div>
  );
};
export default DeleteConfirmation;
