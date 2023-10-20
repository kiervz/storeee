import StatusFilter from "./status-filter";

const ToolBar = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4">
      <StatusFilter />
    </div>
  );
};

export default ToolBar;
