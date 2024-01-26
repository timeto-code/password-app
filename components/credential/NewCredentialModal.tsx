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
