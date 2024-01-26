"use server";

import prisma from "@/lib/db";
import { GetCredential } from "@/schemas";
import { z } from "zod";

export const getCredentials = async (data: z.infer<typeof GetCredential>) => {
  const validation = GetCredential.safeParse(data);

  if (!validation.success) {
    return { error: JSON.stringify(validation.error.format()) };
  }

  const { id } = validation.data;

  const credentials = await prisma.credential.findUnique({
    where: {
      id,
    },
    include: {
      account: {
        include: {
          category: true,
        },
      },
    },
  });

  if (!credentials) {
    return { error: "未找到该条信息" };
  }

  return { success: JSON.stringify(credentials) };
};
