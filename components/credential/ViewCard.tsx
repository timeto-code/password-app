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

interface CredentialCardProps {
  credential: Credential_Account_Category;
  handleClick: () => void;
}

const ViewCard = ({ credential, handleClick }: CredentialCardProps) => {
  return (
    <Card className="group relative p-4 hover:shadow-md cursor-pointer transition-all ease-in-out duration-300">
      <CardHeader className="p-0 m-0 pb-1">
        <CardTitle className="text-md">
          <div className="flex items-center justify-between">
            <p>{credential.account.name}</p>
            {/* <p>{credential.account.category?.name}</p> */}
            <DeleteCredential credentialId={credential.id} />
          </div>
        </CardTitle>
        <CardDescription>{credential.description}</CardDescription>
      </CardHeader>
      <CardContent className="group flex flex-col gap-2 m-0 p-0 text-sm">
        {/* <div className="grid grid-cols-2 gap-2"></div> */}
        <p>名称：{credential.account.website}</p>
        <p>用户名：{credential.username}</p>
        <p>密码：{credential.password}</p>
        <p>应用专用密码：{credential.appSpecificPassword}</p>
        <p>激活码：{credential.activationCode}</p>
        <p>API Key：{credential.apiKey}</p>
        <p>API Secret：{credential.apiSecret}</p>
        <div className="group absolute hidden group-hover:flex right-5 bottom-5 transition-all ease-in-out items-center justify-center hover:text-sky-400">
          <Edit className="cursor-pointer w-6 h-6" onClick={handleClick} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ViewCard;
