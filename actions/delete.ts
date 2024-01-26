"use server";

import { DeleteCredential } from "@/schemas";
import { z } from "zod";
import prisma from "@/lib/db";

export const deleteCredential = async (
  data: z.infer<typeof DeleteCredential>
) => {
  const validation = DeleteCredential.safeParse(data);

  if (!validation.success) {
    return { error: JSON.stringify(validation.error.format()) };
  }

  const { id } = validation.data;

  const credential = await prisma.credential.findUnique({
    where: {
      id,
    },
  });

  if (!credential) {
    return { error: "信息不存在" };
  }

  await prisma.credential.delete({
    where: {
      id,
    },
  });

  return { success: "信息删除成功" };
};
