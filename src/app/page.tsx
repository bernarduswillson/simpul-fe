'use client';

// Libs
import { useState } from "react";
import Image from "next/image";

// Assets
import rightArrowIcon from "@/assets/icons/right-arrow-ic.svg";

// Components
import SearchBar from "@/components/input/SearchBar";
import CornerButton from "@/components/button/CornerButton";
import InboxPopup from "@/components/popup/InboxPopup";
import TaskPopup from "@/components/popup/TaskPopup";


export default function Home() {
  // State
  const [active, setActive] = useState<"task" | "inbox" | "none">("none");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // Handlers
  const handleButtonClick = (clicked: "task" | "inbox" | "none") => {
    setActive(clicked);
  };

  return (
    <main className="relative flex bg-background h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <div className={`h-screen relative border-r-[1px] border-white flex justify-end items-center transition-all duration-300 ${isSidebarOpen ? 'w-[256px]' : 'w-[60px]'}`}>
        <button 
          className={`h-12 w-12 relative flex justify-center items-center rounded-full bg-primary-black translate-x-6 cursor-pointer transition-all duration-300 ${isSidebarOpen ? "rotate-180" : "rotate-0"} ${active !== 'none' ? 'z-[1]' : 'z-30'}`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Image src={rightArrowIcon} alt="right arrow icon" className="p-3"/>
        </button>
      </div>


      {/* Container */}
      <div className="relative flex-1">
        <SearchBar />

        {/* Corner Button */}
        <div className="fixed bottom-6 right-6">
          <CornerButton active={active} onClick={handleButtonClick} />
        </div>

        {/* Popup */}
        <div className={`fixed h-[70vh] inset-x-0 flex items-end justify-center bottom-28 right-6 ml-6 z-20 md:inset-auto md:bottom-28 md:right-6 md:h-[734px] md:w-[734px]`}>
          <div className={`relative w-full transition-all duration-300 bg-black ${active === 'inbox' ? 'translate-x-[0px] h-[100%] w-[100%] opacity-100' : 'translate-x-[520px] h-[0px] w-[0px] opacity-100'}`}>
            <InboxPopup />
          </div>
          <div className={`relative w-full transition-all duration-300 bg-black ${active === 'task' ? 'translate-x-[0px] h-[100%] w-[100%] opacity-100' : 'translate-x-[520px] h-[0px] w-[0px] opacity-100'}`}>
            <TaskPopup />
          </div>
        </div>
      </div>
    </main>
  );
}
