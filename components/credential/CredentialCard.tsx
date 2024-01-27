"use client";

import { useEditModalCredentialStore, useEditModalStore } from "@/lib/store";
import { Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CredentialField from "./CredentialField";
import { Credential_Account_Category } from "./CredentialList";
import DeleteCredential from "./DeleteCredential";

interface CredentialCardProps {
  credential: Credential_Account_Category;
}

const CredentialCard = ({ credential }: CredentialCardProps) => {
  const setOpen = useEditModalStore((state) => state.setOpen);
  const setCredential = useEditModalCredentialStore(
    (state) => state.setCredential
  );

  const hendleEdit = () => {
    setCredential(credential);
    setOpen(true);
  };

  return (
    <div className="break-inside-avoid mb-3">
      <Card className="group relative p-4 hover:shadow-md transition-all ease-in-out duration-300 w-80 border-stone-300">
        <CardHeader className="p-0 m-0 pb-3">
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
        </CardHeader>
        <CardContent className="group flex flex-col gap-2 m-0 p-0 text-sm">
          <CredentialField
            label="类型"
            value={credential.category.name || ""}
          />
          <CredentialField label="用户名" value={credential.username || ""} />
          <CredentialField label="昵称" value={credential.name || ""} />
          <CredentialField
            label="密码"
            value={credential.password || ""}
            isPassword
          />
          <CredentialField
            label="应用专用密码"
            value={credential.appSpecificPassword || ""}
            isPassword
          />
          <CredentialField
            label="激活码"
            value={credential.activationCode || ""}
            isPassword
          />
          <CredentialField
            label="API Key"
            value={credential.apiKey || ""}
            isPassword
          />
          <CredentialField
            label="API Secret"
            value={credential.apiSecret || ""}
            isPassword
          />
          <CredentialField label="描述" value={credential.description || ""} />
          {/* <div className="group absolute hidden group-hover:flex right-5 bottom-5 transition-all ease-in-out items-center justify-center hover:text-sky-400">
          <Edit className="cursor-pointer w-6 h-6" onClick={handleClick} />
        </div> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default CredentialCard;
