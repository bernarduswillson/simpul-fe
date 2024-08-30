// Assets
import SearchIcon from "@/assets/icons/search-ic";


export default function SearchBar() {
  return (
    <div className="relative bg-primary-black h-10 w-full flex items-center">
      {/* Search Icon */}
      <div className="ml-3">
        <SearchIcon width={20} height={20} fillColor="#FFFFFF" />
      </div>
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent text-white placeholder-primary-gray w-full h-full ml-3 outline-none lato-regular"
      />
    </div>
  );
}
