"use client";

import { useSearchStore } from "@/lib/store";
import { Input } from "../ui/input";

const Search = () => {
  const refreshKeyword = useSearchStore((state) => state.refreshKeyword);

  return (
    <Input
      placeholder="搜索"
      onChange={(event) => {
        refreshKeyword(event.target.value);
      }}
    />
  );
};

export default Search;
