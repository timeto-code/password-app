"use client";

import { useEditModalCredentialStore, useEditModalStore } from "@/lib/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import EditCredentialForm from "./EditCredentialForm";

const EditCredentialModal = () => {
  const open = useEditModalStore((state) => state.open);
  const setOpen = useEditModalStore((state) => state.setOpen);
  const credential = useEditModalCredentialStore((state) => state.credential);

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>更新</DialogTitle>
          <DialogDescription>
            {/* Make changes to your profile here. Click save when youre done. */}
          </DialogDescription>
        </DialogHeader>
        <EditCredentialForm credential={credential!} />
      </DialogContent>
    </Dialog>
  );
};

export default EditCredentialModal;
