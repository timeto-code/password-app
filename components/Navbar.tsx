import NewCredentialModal from "./credential/NewCredentialModal";
import Search from "./credential/Search";

const Navbar = () => {
  return (
    <nav className="w-full h-full flex justify-center items-center">
      <div className="mx-auto grid grid-cols-2 gap-4">
        <Search />
        <NewCredentialModal />
      </div>
    </nav>
  );
};

export default Navbar;
