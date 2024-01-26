"use client";

import React from "react";

interface HeaderItemProps {
  title: string;
  action?: () => void;
}

const HeaderItem = ({ title, action }: HeaderItemProps) => {
  return (
    <div className="w-full cursor-pointer" onClick={action}>
      {title}
    </div>
  );
};

export default HeaderItem;
