/* eslint-disable react/prop-types */
const TaskBarButton = ({ text, children, ...props }) => {
  return (
    <div
      className="flex flex-row items-center gap-2 py-2 pl-4 pr-6 border-r-2 border-y-2 border-color2 text-xl hover:bg-color2 hover:text-color1"
      {...props}
    >
      {children}
      <div>{text}</div>
    </div>
  );
};

export default TaskBarButton;
