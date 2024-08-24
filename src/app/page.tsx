'use client';

// Libs
import { useState } from "react";

// Components
import SearchBar from "@/components/input/SearchBar";
import CornerButton from "@/components/button/CornerButton";


export default function Home() {
  // State
  const [active, setActive] = useState<"task" | "inbox" | "none">("none");

  // Handlers
  const handleButtonClick = (clicked: "task" | "inbox" | "none") => {
    setActive(clicked);
  };

  return (
    <main className="relative flex bg-background h-screen w-screen">
      {/* Sidebar */}
      <div className="h-screen w-64 border-r-[1px] border-white"></div>

      {/* Container */}
      <div className="relative flex-1">
        <SearchBar />

        <div className="fixed bottom-6 right-6">
          <CornerButton active={active} onClick={handleButtonClick} />
        </div>
      </div>
    </main>
  );
}
