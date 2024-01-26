"use client";

import Link from "next/link";
import NewCredentialModal from "./credential/NewCredentialModal";
import Search from "./credential/Search";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="w-full h-full flex justify-center items-center">
      <div className="flex justify-between w-[968px] items-center gap-2">
        <NewCredentialModal />
        <Search />
        <Button>备份</Button>
        <Link href="/">
          <Button>刷新</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
