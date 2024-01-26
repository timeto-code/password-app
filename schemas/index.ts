import * as z from "zod";

export const CreateCredentialSchema = z.object({
  username: z.string().min(1, {
    message: "请输入用户名",
  }),
  password: z.string().min(6, {
    message: "请输入密码",
  }),
  appSpecificPassword: z.string().optional(),
  accountName: z.string().min(1, {
    message: "请输入账号名",
  }),
  activationCode: z.string().optional(),
  category: z.string().min(1, {
    message: "请选择分类",
  }),
});

export const UpdateCredentialSchema = z.object({
  id: z.string(),
  username: z.string().min(1, {
    message: "请输入用户名",
  }),
  password: z.string().min(6, {
    message: "请输入密码",
  }),
  appSpecificPassword: z.string().optional(),
  accountName: z.string().min(1, {
    message: "请输入账号名",
  }),
  // activationCode: z.string().optional(),
  category: z.string().min(1, {
    message: "请选择分类",
  }),
});

export const GetCredential = z.object({
  id: z.number(),
});

export const DeleteCredential = z.object({
  id: z.number(),
});
