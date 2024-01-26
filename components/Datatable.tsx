"use client";

import { useSearchStore, useUpdateEventStore } from "@/lib/store";
import HeaderItem from "./HeaderItem";
import TableItem from "./TableItem";
import { useEffect, useState } from "react";
import { Credential } from "@prisma/client";
import { getAllCredentials } from "@/actions/getAll";

const Datatable = () => {
  const actionId = useUpdateEventStore((state) => state.actionId);
  const keyword = useSearchStore((state) => state.keyword);
  const [credentials, setCredentials] = useState<Credential[]>([]);

  useEffect(() => {
    console.log("actionId", actionId);
    getAllCredentials(keyword).then((res) => {
      setCredentials(res);
    });
  }, [actionId, keyword]);

  return (
    <div className="overflow-auto h-full w-full">
      <table className="w-full table-fixed">
        <thead>
          <tr className="border-b shadow-sm sticky top-0 z-10 bg-white">
            <td>
              <HeaderItem title="账户" />
            </td>
            <td>
              <HeaderItem title="用户名" />
            </td>
            <td>
              <HeaderItem title="密码" />
            </td>
            <td>
              <HeaderItem title="应用专用密码" />
            </td>
            <td>
              <HeaderItem title="激活码" />
            </td>
            <td>
              <HeaderItem title="分类" />
            </td>
          </tr>
        </thead>
        <tbody>
          {credentials.map((credential) => (
            <tr key={credential.id} className="border-b hover:bg-slate-100">
              <td>
                <TableItem
                  title={credential.account.name}
                  action="edit"
                  credentialId={credential.id}
                />
              </td>
              <td>
                <TableItem title={credential.username} action="copy" />
              </td>
              <td>
                <TableItem title={credential.password || ""} action="copy" />
              </td>
              <td>
                <TableItem
                  title={credential.appSpecificPassword || ""}
                  action="copy"
                />
              </td>
              <td>
                <TableItem
                  title={credential.activationCode || ""}
                  action="copy"
                />
              </td>
              <td>
                <TableItem
                  title={credential.account.category?.name || ""}
                  action="copy"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Datatable;
