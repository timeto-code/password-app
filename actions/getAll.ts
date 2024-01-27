"use server";

import { decrypt } from "@/lib/aes";
import prisma from "@/lib/db";

export const getAllCredentials = async (value: string) => {
  let filter = {};

  if (value) {
    filter = {
      OR: [
        {
          account: {
            name: {
              contains: value,
            },
          },
        },
        {
          category: {
            name: {
              contains: value,
            },
          },
        },
        {
          name: {
            contains: value,
          },
        },
        {
          description: {
            contains: value,
          },
        },
      ],
    };
  }

  const credentials = await prisma.credential.findMany({
    where: filter,
    include: {
      account: true,
      category: true,
    },
  });

  for (const credential of credentials) {
    credential.username = credential.username
      ? decrypt(credential.username)
      : "";
    credential.password = credential.password
      ? decrypt(credential.password)
      : "";
    credential.activationCode = credential.activationCode
      ? decrypt(credential.activationCode)
      : "";
    credential.appSpecificPassword = credential.appSpecificPassword
      ? decrypt(credential.appSpecificPassword)
      : "";
    credential.apiKey = credential.apiKey ? decrypt(credential.apiKey) : "";
    credential.apiSecret = credential.apiSecret
      ? decrypt(credential.apiSecret)
      : "";
  }

  return credentials;
};
