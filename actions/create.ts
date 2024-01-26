"use server";

import { CreateCredentialSchema } from "@/schemas";
import { z } from "zod";
import prisma from "@/lib/db";

export const createCredential = async (
  data: z.infer<typeof CreateCredentialSchema>
) => {
  const validation = CreateCredentialSchema.safeParse(data);

  if (!validation.success) {
    return { error: JSON.stringify(validation.error.format()) };
  }

  const {
    username,
    password,
    accountName,
    category,
    activationCode,
    appSpecificPassword,
  } = validation.data;

  let dbCategory = await prisma.category.findUnique({
    where: {
      name: category,
    },
  });

  if (!dbCategory) {
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
    account = await prisma.account.create({
      data: {
        name: accountName,
        categoryId: dbCategory.id,
      },
    });
  }

  await prisma.credential.create({
    data: {
      username,
      password,
      accountId: account.id,
      activationCode,
      appSpecificPassword,
    },
  });

  return { success: "信息保存成功" };
};
