"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import NewCredentialForm from "./NewCredentialForm";
import { Edit } from "lucide-react";
import EditCredentialForm from "./EditCredentialForm";
import { Credential_Account_Category } from "./CredentialList";
import { useEditModalCredentialStore, useEditModalStore } from "@/lib/store";

const EditCredentialModal = () => {
  const open = useEditModalStore((state) => state.open);
  const setOpen = useEditModalStore((state) => state.setOpen);
  const credential = useEditModalCredentialStore((state) => state.credential);

  useEffect(() => {
    console.log("credential", credential);
  }, [credential]);

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
