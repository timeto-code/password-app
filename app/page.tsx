import CredentialList from "@/components/credential/CredentialList";
import EditCredentialModal from "@/components/credential/EditCredentialModal";
import NewCredentialModal from "@/components/credential/NewCredentialModal";

export default async function Home() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full mx-auto p-3">
        <CredentialList />
      </div>
      <EditCredentialModal />
      {/* <NewCredentialModal /> */}
    </div>
  );
}
