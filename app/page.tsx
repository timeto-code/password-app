import { loadEnv } from "@/actions/loadEnv";
import CredentialList from "@/components/credential/CredentialList";
import { error } from "console";
import Image from "next/image";

export default async function Home() {
  // 读取密钥
  const { error, sucess } = loadEnv();

  return (
    <>
      {error && (
        <div className="h-full w-full flex flex-col items-center justify-center gap-2">
          <Image
            src="/usb-drive.png"
            alt="usb-drive"
            width={200}
            height={100}
            className="mx-auto rotate-90"
            quality={100}
            priority={true}
          />
          <p className="font-semibold">请插入密钥</p>
        </div>
      )}
      {sucess && (
        <div className="h-full flex justify-center mx-auto p-3 overflow-y-auto">
          <CredentialList />
        </div>
      )}
    </>
  );
}
