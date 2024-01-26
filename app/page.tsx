import Datatable from "@/components/Datatable";

export default async function Home() {
  return (
    <div className="py-3 pl-3 overflow-auto h-full w-full">
      <Datatable />
    </div>
  );
}
