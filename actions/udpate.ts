"use server";

import { UpdateCredentialSchema } from "@/schemas";
import { z } from "zod";
import prisma from "@/lib/db";
import { encrypt } from "@/lib/aes";

export const updateCredential = async (
  data: z.infer<typeof UpdateCredentialSchema>
) => {
  const validation = UpdateCredentialSchema.safeParse(data);

  if (!validation.success) {
    return { error: JSON.stringify(validation.error) };
  }

  const {
    id,
    accountName,
    category,
    username,
    name,
    password,
    description,
    appSpecificPassword,
    activationCode,
    apiKey,
    apiSecret,
  } = validation.data;

  let dbCategory = await prisma.category.findUnique({
    where: {
      name: category,
    },
  });

  if (!dbCategory) {
    // 如果分类不存在，则创建新的分类
    dbCategory = await prisma.category.create({
      data: {
        name: category,
      },
    });
  }

  let account = await prisma.account.findFirst({
    where: {
      name: accountName.trim(),
    },
  });

  // 如果同名账户不存在，则创建新的账户
  if (!account) {
    account = await prisma.account.create({
      data: {
        name: accountName.trim(),
      },
    });
  }

  const credential = await prisma.credential.findUnique({
    where: {
      id,
    },
  });

  if (!credential) {
    return { error: "信息不存在" };
  }

  // 更新凭证信息
  await prisma.credential.update({
    where: {
      id,
    },
    data: {
      accountId: account.id,
      categoryId: dbCategory.id,
      username: encrypt(username),
      name,
      password: encrypt(password),
      description,
      appSpecificPassword: encrypt(appSpecificPassword),
      activationCode: encrypt(activationCode),
      apiKey: encrypt(apiKey),
      apiSecret: encrypt(apiSecret),
    },
  });

  return { success: "信息更新成功" };
};
