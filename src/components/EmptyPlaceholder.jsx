/* eslint-disable react/prop-types */
const EmptyPlaceholder = ({ text }) => {
  return (
    <div className="absolute inset-0 h-full w-full flex justify-center items-center bg-color1 text-3xl text-color2">
      {text}
    </div>
  );
};

export default EmptyPlaceholder;
