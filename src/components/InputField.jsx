/* eslint-disable react/prop-types */
const InputField = ({ value, onChange, ...props }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="text-white bg-color1 border-2 border-color2 p-2 focus:outline-none focus:border-color4"
      {...props}
    />
  );
};

export default InputField;
