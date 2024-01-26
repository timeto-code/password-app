"use client";

import { Edit, Edit2Icon, Trash2Icon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Credential_Account_Category } from "./CredentialList";
import { useState } from "react";
import ViewCard from "./ViewCard";
import EditCard from "./EditCard";

interface CredentialCardProps {
  credential: Credential_Account_Category;
}

const CredentialCard = ({ credential }: CredentialCardProps) => {
  const [edit, setEdit] = useState(false);

  return (
    <>
      {edit ? (
        <EditCard credential={credential} handleClick={() => setEdit(false)} />
      ) : (
        <ViewCard credential={credential} handleClick={() => setEdit(true)} />
      )}
    </>
  );
};

export default CredentialCard;
