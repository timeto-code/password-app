"use client";

import { createCredential } from "@/actions/create";
import { CreateCredentialSchema, UpdateCredentialSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import FormError from "../FormError";
import FormSuccess from "../FormSuccess";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import {
  useCredentialStore,
  useEditModalCredentialStore,
  useUpdateEventStore,
} from "@/lib/store";
import { updateCredential } from "@/actions/udpate";
import { getCredentials } from "@/actions/get";
import { Credential_Account_Category } from "./CredentialList";

interface EditCredentialFormProps {
  credential: Credential_Account_Category;
}

const EditCredentialForm = ({ credential }: EditCredentialFormProps) => {
  const credentialId = useCredentialStore((state) => state.credentialId);
  const refreshActionId = useUpdateEventStore((state) => state.refreshActionId);
  const actionId = useUpdateEventStore((state) => state.actionId);
  // const credential = useEditModalCredentialStore((state) => state.credential);

  const [showPassword, setShowPassword] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const [searchCategory, setSearchCategory] = useState(false);

  const form = useForm({
    resolver: zodResolver(UpdateCredentialSchema),
    defaultValues: {
      id: 0,
      name: "",
      username: "",
      password: "",
      activationCode: "",
      appSpecificPassword: "",
      description: "",
      apiKey: "",
      apiSecret: "",

      accountName: "",
      category: "",
    },
  });

  const onSubmit = (data: z.infer<typeof UpdateCredentialSchema>) => {
    setError("");
    setSuccess("");

    console.log("data", data);

    startTransition(async () => {
      updateCredential(data).then(({ error, success }) => {
        if (error) {
          setError(error);
        } else {
          setSuccess(success || "创建成功");
          refreshActionId(actionId + 1);
          form.reset();
        }
      });
    });
  };

  useEffect(() => {
    setError("");
    setSuccess("");

    if (credential) {
      form.setValue("id", credential.id);
      form.setValue("name", credential.name || "");
      form.setValue("username", credential.username || "");
      form.setValue("password", credential.password || "");
      form.setValue("activationCode", credential.activationCode || "");
      form.setValue(
        "appSpecificPassword",
        credential.appSpecificPassword || ""
      );
      form.setValue("description", credential.description || "");
      form.setValue("apiKey", credential.apiKey || "");
      form.setValue("apiSecret", credential.apiSecret || "");

      form.setValue("accountName", credential.account.name);
      form.setValue("category", credential.account.category?.name || "");
    }
  }, [credential, form]);

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <FormField
              name="id"
              control={form.control}
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormLabel>
                    <div className="">ID</div>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="accountName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="">账号</div>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="">用户名</div>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="">名称</div>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="">密码</div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="appSpecificPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="">应用专用密码</div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="activationCode"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="">激活码</div>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="apiKey"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="">API Key</div>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="apiSecret"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="">API Secret</div>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="">描述</div>
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <Input {...field} />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="">分类</div>
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <Input {...field} />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </Form>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className="w-full" disabled={isPending}>
            更新
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditCredentialForm;
