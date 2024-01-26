"use client";

import { updateCredential } from "@/actions/udpate";
import { UpdateCredentialSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { use, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { useCredentialStore, useUpdateEventStore } from "@/lib/store";
import { get } from "http";
import { getCredentials } from "@/actions/get";
import DeleteButton from "./DeleteButton";

const EditForm = () => {
  const credentialId = useCredentialStore((state) => state.credentialId);
  const refreshActionId = useUpdateEventStore((state) => state.refreshActionId);

  const [showPassword, setShowPassword] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const [searchCategory, setSearchCategory] = useState(false);

  const form = useForm({
    resolver: zodResolver(UpdateCredentialSchema),
    defaultValues: {
      id: "",
      username: "",
      password: "",
      appSpecificPassword: "",
      accountName: "",
      // activationCode: "",
      category: "",
    },
  });

  const onSubmit = (data: z.infer<typeof UpdateCredentialSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      updateCredential(data).then(({ error, success }) => {
        if (error) {
          setError(error);
        } else {
          setSuccess(success || "创建成功");
          refreshActionId(credentialId);
          form.reset();
        }
      });
    });
  };

  useEffect(() => {
    setError("");
    setSuccess("");

    if (credentialId) {
      console.log("credentialId", credentialId);
      getCredentials({ id: credentialId }).then(({ error, success }) => {
        if (error) {
          setError(error);
        } else if (success) {
          const credential = JSON.parse(success);
          form.setValue("id", `${credentialId}`);
          form.setValue("username", credential.username);
          form.setValue("password", credential.password);
          form.setValue("accountName", credential.account.name);
          form.setValue("category", credential.account.category?.name);
          // form.setValue("activationCode", credential.activationCode);
          form.setValue("appSpecificPassword", credential.appSpecificPassword);
        }
      });
    }
  }, [form, credentialId]);

  return (
    <div className=" flex flex-col gap-10">
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
            {/* <FormField
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
            /> */}
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
                      <Input
                        {...field}
                        onFocus={() => setSearchCategory(true)}
                        onBlur={() => setSearchCategory(false)}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </Form>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className="w-full" disabled={isPending}>
            修改
          </Button>
        </div>
      </form>

      <DeleteButton />
    </div>
  );
};

export default EditForm;
