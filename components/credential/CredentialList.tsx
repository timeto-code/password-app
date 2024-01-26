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
  /**
   * 凭据列表。
   * @remarks
   * 此组件从相应的存储中检索actionId和关键字，并管理凭据数组的状态。
   */
  const actionId = useUpdateEventStore((state) => state.actionId);
  const keyword = useSearchStore((state) => state.keyword);
  const [credentials, setCredentials] = useState<Credential_Account_Category[]>(
    []
  );

  /**
   * 根据提供的关键字获取所有凭据并更新状态。
   * @param {string} keyword - 用于筛选凭据的关键字。
   * @returns {void}
   */
  useEffect(() => {
    getAllCredentials(keyword).then((res) => {
      setCredentials(res);
    });
  }, [actionId, keyword]);

  return (
    <div className="columns-3 gap-x-1">
      {credentials.map((credential) => (
        <CredentialCard key={credential.id} credential={credential} />
      ))}
    </div>
  );
};

export default CredentialList;
