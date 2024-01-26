"use client";

import { createCredential } from "@/actions/create";
import { CreateCredentialSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import InputSearch from "./InputSearch";
import { cn } from "@/lib/utils";

const CreateForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const [searchCategory, setSearchCategory] = useState(false);

  const form = useForm({
    resolver: zodResolver(CreateCredentialSchema),
    defaultValues: {
      username: "",
      password: "",
      appSpecificPassword: "",
      accountName: "",
      activationCode: "",
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
        }
      });
    });
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <Form {...form}>
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
                      {/* <div
                        className={cn(
                          "border rounded-sm mt-[2px] bg-white p-1 absolute z-10 hidden",
                          searchCategory && "flex"
                        )}
                      >
                        xxxx <br />
                        xxxx <br />
                        xxxx <br />
                        xxxx <br />
                        xxxx <br />
                        xxxx <br />
                        xxxx <br />
                        xxxx <br />
                      </div> */}
                    </div>
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

export default CreateForm;
