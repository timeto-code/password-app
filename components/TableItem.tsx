"use client";

import {useCredentialStore} from "@/lib/store";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";

interface TableItemProps {
  credentialId?: number;
  title: string;
  action: "copy" | "edit";
}

const TableItem = ({ title, action, credentialId }: TableItemProps) => {
  const [copy, setCopy] = React.useState(false);
  const refreshId = useCredentialStore((state) => state.refreshId);

  const copyToClipboard = (e: React.MouseEvent) => {
    e.preventDefault();
    if (action === "copy") {
      navigator.clipboard.writeText(title);
      setCopy(true);
    } else if (action === "edit" && credentialId) {
      console.log("edit", credentialId);

      refreshId(credentialId);
    }
  };

  useEffect(() => {
    if (copy) {
      setTimeout(() => {
        setCopy(false);
      }, 3000);
    }
  }, [copy]);

  return (
    <div className="flex items-center py-1 pr-1">
      <p
        className={cn(
          "text-nowrap overflow-hidden overflow-ellipsis text-sm",
          copy && "text-green-500"
        )}
      >
        <Link href="#" onClick={(event) => copyToClipboard(event)}>
          {title}
        </Link>
      </p>
      {copy && <CheckCircle className="w-4 h-4 ml-1 text-green-500" />}
    </div>
  );
};

export default TableItem;
