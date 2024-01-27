import * as z from "zod";

export const CreateCredentialSchema = z.object({
  name: z.string(),
  username: z.string(),
  password: z.string(),
  appSpecificPassword: z.string(),
  activationCode: z.string(),
  description: z.string(),
  apiKey: z.string(),
  apiSecret: z.string(),

  accountName: z.string().min(1).max(255),
  category: z.string(),
});

export const UpdateCredentialSchema = z.object({
  id: z.string().min(1).max(10000),
  name: z.string(),
  username: z.string(),
  password: z.string(),
  appSpecificPassword: z.string(),
  activationCode: z.string(),
  description: z.string(),
  apiKey: z.string(),
  apiSecret: z.string(),

  accountName: z.string(),
  category: z.string(),
});

export const DeleteCredential = z.object({
  id: z.string().min(1).max(10000),
});
