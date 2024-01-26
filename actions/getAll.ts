"use server";

import prisma from "@/lib/db";

export const getAllCredentials = async (value: string) => {
  let filter = {};

  if (value) {
    filter = {
      OR: [
        {
          username: {
            contains: value,
          },
        },
        {
          account: {
            name: {
              contains: value,
            },
          },
        },
        {
          account: {
            category: {
              name: {
                contains: value,
              },
            },
          },
        },
      ],
    };
  }

  const credentials = await prisma.credential.findMany({
    where: filter,
    include: {
      account: {
        include: {
          category: true,
        },
      },
    },
  });

  return credentials;
};
