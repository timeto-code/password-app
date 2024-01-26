"use server";

import { CreateCredentialSchema } from "@/schemas";
import { z } from "zod";
import prisma from "@/lib/db";
import { encrypt } from "@/lib/aes";

/**
 * 创建凭据
 * @param data 凭据数据
 * @returns 成功保存信息或错误信息
 */
export const createCredential = async (
  data: z.infer<typeof CreateCredentialSchema>
) => {
  // 使用 `CreateCredentialSchema` 对 `data` 进行安全解析
  const validation = CreateCredentialSchema.safeParse(data);

  // 如果解析不成功，返回错误信息
  if (!validation.success) {
    return { error: JSON.stringify(validation.error.format()) };
  }

  // 从解析成功的数据中解构出需要的字段
  const {
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

  // 在数据库中查找是否存在该类别
  let dbCategory = await prisma.category.findUnique({
    where: {
      name: category,
    },
  });

  // 如果不存在，就创建一个新的类别
  if (!dbCategory) {
    dbCategory = await prisma.category.create({
      data: {
        name: category,
      },
    });
  }

  // 在数据库中查找是否存在该账户
  let account = await prisma.account.findUnique({
    where: {
      name: accountName,
      categoryId: dbCategory.id,
    },
  });

  // 如果不存在，就创建一个新的账户
  if (!account) {
    account = await prisma.account.findUnique({
      where: {
        name: accountName,
      },
    });

    // 如果账户存在，就更新账户的类别
    if (account) {
      await prisma.account.update({
        where: {
          id: account.id,
        },
        data: {
          categoryId: dbCategory.id,
        },
      });
    } else {
      // 如果账户不存在，就创建一个新的账户
      account = await prisma.account.create({
        data: {
          name: accountName,
          categoryId: dbCategory.id,
        },
      });
    }
  }

  // 创建一个新的凭证
  await prisma.credential.create({
    data: {
      name,
      username: encrypt(username),
      password: encrypt(password),
      accountId: account.id,
      activationCode: encrypt(activationCode),
      appSpecificPassword: encrypt(appSpecificPassword),
      apiKey: encrypt(apiKey),
      apiSecret: encrypt(apiSecret),
      description,
    },
  });

  // 返回成功信息
  return { success: "信息保存成功" };
};
