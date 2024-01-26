"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import FormSuccess from "./FormSuccess";
import FormError from "./FormError";
import { deleteCredential } from "@/actions/delete";
import { useCredentialStore, useUpdateEventStore } from "@/lib/store";

const DeleteButton = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const credentialId = useCredentialStore((state) => state.credentialId);
  const refreshActionId = useUpdateEventStore((state) => state.refreshActionId);

  const handleDelete = () => {
    deleteCredential({ id: credentialId }).then(({ error, success }) => {
      if (error) {
        setError(error);
      } else {
        setSuccess(success || "删除成功");
        refreshActionId(credentialId);
      }
    });
  };

  useEffect(() => {
    setError("");
    setSuccess("");
  }, [credentialId]);

  return (
    <div>
      <FormError message={error} />
      <FormSuccess message={success} />{" "}
      <Button variant="destructive" className="w-full" onClick={handleDelete}>
        删除
      </Button>
    </div>
  );
};

export default DeleteButton;
