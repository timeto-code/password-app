import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Trash2Icon, Edit } from "lucide-react";
import { Credential_Account_Category } from "./CredentialList";
import DeleteCredential from "./DeleteCredential";
import CredentialField from "./CredentialField";
import { useEditModalCredentialStore, useEditModalStore } from "@/lib/store";

interface CredentialCardProps {
  credential: Credential_Account_Category;
  handleClick: () => void;
}

const ViewCard = ({ credential, handleClick }: CredentialCardProps) => {
  const setOpen = useEditModalStore((state) => state.setOpen);
  const setCredential = useEditModalCredentialStore(
    (state) => state.setCredential
  );

  const hendleEdit = () => {
    setCredential(credential);
    setOpen(true);
  };

  return (
    <Card className="group relative p-4 hover:shadow-md transition-all ease-in-out duration-300 w-80">
      <CardHeader className="p-0 m-0 pb-2">
        <CardTitle className="text-md">
          <div className="flex items-center justify-between">
            <p>{credential.account.name}</p>
            {/* <p>{credential.account.category?.name}</p> */}
            <div className="flex items-center justify-between gap-5">
              <Edit
                className="cursor-pointer w-4 h-4 hover:text-sky-400"
                onClick={hendleEdit}
              />
              <DeleteCredential credentialId={credential.id} />
            </div>
          </div>
        </CardTitle>
        <CardDescription>{credential.description}</CardDescription>
      </CardHeader>
      <CardContent className="group flex flex-col gap-2 m-0 p-0 text-sm">
        <CredentialField label="名称" value={credential.name || ""} />
        <CredentialField label="用户名" value={credential.username || ""} />
        <CredentialField
          label="密码"
          value={credential.password || ""}
          isPassword={true}
        />
        <CredentialField
          label="应用专用密码"
          value={credential.appSpecificPassword || ""}
        />
        <CredentialField
          label="激活码"
          value={credential.activationCode || ""}
        />
        <CredentialField label="API Key" value={credential.apiKey || ""} />
        <CredentialField
          label="API Secret"
          value={credential.apiSecret || ""}
        />
        {/* <div className="group absolute hidden group-hover:flex right-5 bottom-5 transition-all ease-in-out items-center justify-center hover:text-sky-400">
          <Edit className="cursor-pointer w-6 h-6" onClick={handleClick} />
        </div> */}
      </CardContent>
    </Card>
  );
};

export default ViewCard;
