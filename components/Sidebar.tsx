import CreateForm from "./CreateForm";
import EditForm from "./EditForm";
import Search from "./Search";

const Sidebar = () => {
  return (
    <div className="h-full p-3 border-r shadow-sm flex flex-col gap-6">
      <Search />
      <CreateForm />
      <EditForm />
    </div>
  );
};

export default Sidebar;
