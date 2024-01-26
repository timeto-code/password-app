import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import NewCredentialForm from "./NewCredentialForm";

const NewCredentialModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>新建</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>新建</DialogTitle>
          <DialogDescription>
            {/* Make changes to your profile here. Click save when youre done. */}
          </DialogDescription>
        </DialogHeader>
        <NewCredentialForm />
      </DialogContent>
    </Dialog>
  );
};

export default NewCredentialModal;
