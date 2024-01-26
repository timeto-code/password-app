"use client";

import { deleteCredential } from "@/actions/delete";
import { useCredentialStore, useUpdateEventStore } from "@/lib/store";
import { Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";

interface DeleteCredentialProps {
  credentialId: number;
}

const DeleteCredential = ({ credentialId }: DeleteCredentialProps) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const refreshActionId = useUpdateEventStore((state) => state.refreshActionId);

  const handleDelete = () => {
    deleteCredential({ id: credentialId }).then(({ error, success }) => {
      if (error) {
        setError(error);
      } else {
        setSuccess(success || "删除成功");
        refreshActionId(credentialId);
      }
    });
  };

  useEffect(() => {
    setError("");
    setSuccess("");
  }, [credentialId]);
  return (
    <Trash2Icon
      className="cursor-pointer w-4 h-4 hover:text-red-400"
      onClick={handleDelete}
    />
  );
};

export default DeleteCredential;
