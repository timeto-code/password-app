"use client";

import { getAllCredentials } from "@/actions/getAll";
import { useSearchStore, useUpdateEventStore } from "@/lib/store";
import { useEffect, useState } from "react";
import CredentialCard from "./CredentialCard";

export interface Credential_Account_Category {
  id: number;
  name: string | null;
  username: string | null;
  password: string | null;
  activationCode: string | null;
  appSpecificPassword: string | null;
  description: string | null;
  apiKey: string | null;
  apiSecret: string | null;
  accountId: number;
  account: {
    id: number;
    name: string;
    website: string | null;
    categoryId: number | null;
    category: {
      id: number;
      name: string;
    } | null;
  };
}

const CredentialList = () => {
  const actionId = useUpdateEventStore((state) => state.actionId);
  const keyword = useSearchStore((state) => state.keyword);
  const [credentials, setCredentials] = useState<Credential_Account_Category[]>(
    []
  );

  useEffect(() => {
    console.log("actionId", actionId);
    getAllCredentials(keyword).then((res) => {
      setCredentials(res);
    });
  }, [actionId, keyword]);

  return (
    <div className="grid grid-cols-3 gap-1">
      {credentials.map((credential) => (
        <CredentialCard key={credential.id} credential={credential} />
      ))}
    </div>
  );
};

export default CredentialList;
