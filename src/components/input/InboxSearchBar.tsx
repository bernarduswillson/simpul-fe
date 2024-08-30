// Assets
import SearchIcon from "@/assets/icons/search-ic";

// Interface
interface InboxSearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export default function InboxSearchBar(props: InboxSearchBarProps) {
  // Props
  const { value, onChange } = props;

  
  return (
    <div className="relative bg-white border-2 border-primary-gray rounded-md h-9 w-full flex items-center focus-within:border-primary-blue focus-within:scale-[1.01] transition-all duration-500">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={onChange}
        className="bg-transparent text-primary-black placeholder-primary-gray w-full h-full ml-10 outline-none lato-regular peer"
      />

      {/* Search Icon */}
      <div className="mr-10 ml-3 scale-100 transition-transform duration-300 peer-focus:scale-0">
        <SearchIcon width={14} height={14} fillColor="#333333" />
      </div>
    </div>
  );
}
