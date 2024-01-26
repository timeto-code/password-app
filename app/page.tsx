import CredentialList from "@/components/credential/CredentialList";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full mx-auto p-3">
      <CredentialList />
    </div>
  );
}
