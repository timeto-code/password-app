"use client";

import { getAllCredentials } from "@/actions/getAll";
import { loadEnv } from "@/actions/loadEnv";
import { useSearchStore, useUpdateEventStore } from "@/lib/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import CredentialCard from "./CredentialCard";

export interface Credential_Account_Category {
  id: string;

  accountId: string;
  account: {
    id: string;
    name: string;
    website: string | null;
  };

  categoryId: string | null;
  category: {
    id: string;
    name: string;
  };

  username: string | null;
  name: string | null;
  password: string | null;
  description: string | null;
  appSpecificPassword: string | null;
  activationCode: string | null;
  apiKey: string | null;
  apiSecret: string | null;
}

const CredentialList = () => {
  const [evnLoaded, setEvnLoaded] = useState(false);
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
    loadEnv().then(({ error, sucess }) => {
      if (error) {
        setEvnLoaded(false);
      } else {
        setEvnLoaded(true);
      }
    });

    getAllCredentials(keyword).then((res) => {
      setCredentials(res);
    });
  }, [actionId, keyword]);

  if (!evnLoaded) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center gap-2">
        <Image
          src="/usb-drive.png"
          alt="usb-drive"
          width={200}
          height={100}
          className="mx-auto rotate-90"
          quality={100}
          priority={true}
        />
        <p className="font-semibold">请插入密钥</p>
      </div>
    );
  }

  return (
    <div className="columns-3 gap-x-3">
      {credentials.map((credential) => (
        <CredentialCard key={credential.id} credential={credential} />
      ))}
    </div>
  );
};

export default CredentialList;
