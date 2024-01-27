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
            在这里对您的个人资料进行更改。完成后点击保存。
          </DialogDescription>
        </DialogHeader>
        <NewCredentialForm />
      </DialogContent>
    </Dialog>
  );
};

export default NewCredentialModal;
