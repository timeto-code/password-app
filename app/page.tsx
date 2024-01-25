import Image from "next/image";
import prisma from "@/lib/db";

export default async function Home() {
  const credentials = await prisma.credential.findMany({});

  return (
    <div>
      <kbd>{JSON.stringify(credentials)}</kbd>
    </div>
  );
}
