/* eslint-disable react/prop-types */
const DefaultButton = ({ text = "Button", ...props }) => {
  return (
    <button
      className="px-5 py-2 text-lg border-2 border-color2 bg-color1 hover:bg-color2 hover:text-color1"
      {...props}
    >
      {text}
    </button>
  );
};

export default DefaultButton;
