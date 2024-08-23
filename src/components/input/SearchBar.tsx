// Libs
import Image from "next/image";

// Assets
import searchIcon from "@/assets/icons/search-ic.svg";


export default function SearchBar() {
  return (
    <div className="relative bg-primary-black h-10 w-full flex items-center">
      {/* Search Icon */}
      <Image 
        src={searchIcon}
        alt="search icon"
        className="p-[7px] h-full ml-3"
      />
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent text-white placeholder-primary-gray w-full h-full ml-3 outline-none lato-regular"
      />
    </div>
  );
}
