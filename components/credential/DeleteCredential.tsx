"use client";

import { deleteCredential } from "@/actions/delete";
import { useUpdateEventStore } from "@/lib/store";
import { Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";

interface DeleteCredentialProps {
  credentialId: number;
}

const DeleteCredential = ({ credentialId }: DeleteCredentialProps) => {
  const [error, setError] = useState(""); // 错误信息
  const [success, setSuccess] = useState(""); // 成功信息

  const refreshActionId = useUpdateEventStore((state) => state.refreshActionId); // 刷新操作ID

  // 处理删除操作
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
    setError(""); // 清空错误信息
    setSuccess(""); // 清空成功信息
  }, [credentialId]);

  return (
    <Trash2Icon
      className="cursor-pointer w-4 h-4 hover:text-red-400"
      onClick={handleDelete}
    />
  );
};

export default DeleteCredential;
