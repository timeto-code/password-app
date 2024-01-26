import CredentialList from "@/components/credential/CredentialList";

export default async function Home() {
  return (
    <div className="h-full flex justify-center mx-auto p-3 overflow-y-auto">
      <CredentialList />
    </div>
  );
}
