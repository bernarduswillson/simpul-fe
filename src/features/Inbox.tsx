// Components
import SearchBar from "@/components/Inbox/SearchBar";


export default function Inbox() {
  return (
    <div className="relative flex bg-background h-screen w-screen">
      {/* Sidebar */}
      <div className="h-screen w-64 border-r-[1px] border-white"></div>

      {/* Container */}
      <div className="relative flex-1">
        <SearchBar />
      </div>
    </div>
  );
}
