"use client";

import React from "react";
import { Credential_Account_Category } from "./CredentialList";
import { Trash2Icon, Edit } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import EditCredentialForm from "./EditCredentialForm";

interface EditCardProps {
  credential: Credential_Account_Category;
  handleClick: () => void;
}

const EditCard = ({ credential, handleClick }: EditCardProps) => {
  return (
    <Card className="group relative p-4 hover:shadow-md cursor-pointer transition-all ease-in-out duration-300">
      <CardHeader className="p-0 m-0 pb-1">
        <CardTitle className="text-md">
          <div className="flex items-center justify-between">
            <p>{credential.account.name}</p>
            {/* <p>{credential.account.category?.name}</p> */}
            <Trash2Icon className="cursor-pointer w-4 h-4" />
          </div>
        </CardTitle>
        <CardDescription>{credential.description}</CardDescription>
      </CardHeader>
      <CardContent className="group flex flex-col gap-2 m-0 p-0 text-sm">
        <EditCredentialForm credential={credential} handleClick={handleClick} />
      </CardContent>
    </Card>
  );
};

export default EditCard;
