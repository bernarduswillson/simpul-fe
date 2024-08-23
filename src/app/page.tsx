'use client';

import SearchBar from "@/components/input/SearchBar";
import CornerButton from "@/components/button/CornerButton";

export default function Home() {
  const handleButtonClick = (message: string) => {
    console.log(message);
  };

  return (
    <main className="relative flex bg-background h-screen w-screen">
      {/* Sidebar */}
      <div className="h-screen w-64 border-r-[1px] border-white"></div>

      {/* Container */}
      <div className="relative flex-1">
        <SearchBar />

        <div className="fixed bottom-6 right-6">
          <CornerButton onClick={handleButtonClick} />
        </div>
      </div>
    </main>
  );
}
