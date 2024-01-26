"use client";

import { createCredential } from "@/actions/create";
import { CreateCredentialSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import FormError from "../FormError";
import FormSuccess from "../FormSuccess";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { useUpdateEventStore } from "@/lib/store";

const NewCredentialForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const [searchCategory, setSearchCategory] = useState(false);
  const refreshActionId = useUpdateEventStore((state) => state.refreshActionId);
  const actionId = useUpdateEventStore((state) => state.actionId);

  const form = useForm({
    resolver: zodResolver(CreateCredentialSchema),
    defaultValues: {
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

  const onSubmit = (data: z.infer<typeof CreateCredentialSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      createCredential(data).then(({ error, success }) => {
        if (error) {
          setError(error);
        } else {
          setSuccess(success || "创建成功");
          form.reset();
          refreshActionId(actionId + 1);
        }
      });
    });
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <div className="grid grid-cols-2 gap-4">
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
            </div>
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
          </Form>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className="w-full" disabled={isPending}>
            创建
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewCredentialForm;
