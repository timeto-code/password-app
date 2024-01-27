"use client";

import { deleteCredential } from "@/actions/delete";
import { useUpdateEventStore } from "@/lib/store";
import { Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface DeleteCredentialProps {
  credentialId: string;
}

const DeleteCredential = ({ credentialId }: DeleteCredentialProps) => {
  const [open, setOpen] = useState(false); // 是否打开弹窗
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
    <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
      <AlertDialogTrigger asChild>
        {/* <Button variant="outline">Show Dialog</Button> */}
        <Trash2Icon
          className="cursor-pointer w-4 h-4 hover:text-red-400"
          onClick={() => setOpen(true)}
        />
      </AlertDialogTrigger>
      <AlertDialogContent className="m-0 py-4">
        <AlertDialogHeader>
          {/* <AlertDialogTitle>确认删除</AlertDialogTitle> */}
          <AlertDialogDescription>
            此操作无法撤回。确认将此账户从数据库中永久删除吗？
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>确认删除</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCredential;
