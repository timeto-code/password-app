"use server";

import { UpdateCredentialSchema } from "@/schemas";
import { z } from "zod";
import prisma from "@/lib/db";

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
    account = await prisma.account.findUnique({
      where: {
        name: accountName,
      },
    });

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

  await prisma.credential.update({
    where: {
      id,
    },
    data: {
      username,
      password,
      activationCode,
      appSpecificPassword,
      apiKey,
      apiSecret,
      description,
      name,
    },
  });

  return { success: "信息更新成功" };
};
