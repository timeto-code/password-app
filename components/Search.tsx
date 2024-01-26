"use client";

import React from "react";
import { Input } from "./ui/input";
import { useSearchStore } from "@/lib/store";

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
