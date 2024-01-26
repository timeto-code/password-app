"use client";

import { useSearchStore } from "@/lib/store";
import { Input } from "../ui/input";
import { ElementRef, useEffect, useRef } from "react";

const Search = () => {
  const inpRef = useRef<ElementRef<"input">>(null);
  const refreshKeyword = useSearchStore((state) => state.refreshKeyword);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        inpRef.current?.focus();
      }
    };

    document.addEventListener("keydown", down);
    return () => {
      document.removeEventListener("keydown", down);
    };
  }, []);

  return (
    <Input
      ref={inpRef}
      placeholder="/"
      onChange={(event) => {
        refreshKeyword(event.target.value);
      }}
    />
  );
};

export default Search;
