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
    username,
    password,
    accountName,
    category,
    activationCode,
    appSpecificPassword,
    apiKey,
    apiSecret,
    description,
    name,
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
      name: accountName,
      categoryId: dbCategory.id,
    },
  });

  if (!account) {
    // 如果账户不存在，则查找同名账户
    account = await prisma.account.findUnique({
      where: {
        name: accountName,
      },
    });

    if (account) {
      // 如果同名账户存在，则更新其所属分类
      await prisma.account.update({
        where: {
          id: account.id,
        },
        data: {
          categoryId: dbCategory.id,
        },
      });
    } else {
      // 如果同名账户不存在，则创建新的账户
      account = await prisma.account.create({
        data: {
          name: accountName,
          categoryId: dbCategory.id,
        },
      });
    }
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
      username: encrypt(username),
      password: encrypt(password),
      activationCode: encrypt(activationCode),
      appSpecificPassword: encrypt(appSpecificPassword),
      apiKey: encrypt(apiKey),
      apiSecret: encrypt(apiSecret),
      description,
      name,
    },
  });

  return { success: "信息更新成功" };
};
