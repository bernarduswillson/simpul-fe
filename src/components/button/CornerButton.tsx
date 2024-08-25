// Libs
import Image from "next/image";

// Assets
import lightningIcon from "@/assets/icons/lightning-ic.svg";

// Components
import ActionButton from "./ActionButton";

// Interface
interface CornerButtonProps {
  active: "task" | "inbox" | "none";
  onClick?: (clicked: "task" | "inbox" | "none") => void;
}


export default function CornerButton(props: CornerButtonProps) {
  // Props
  const { active, onClick } = props;

  // Handlers
  const handleClick = (clicked: "task" | "inbox" | "none") => {
    if (onClick) {
      onClick(clicked);
    }
  };

  return (
    <div className="relative group">
      <div className="relative flex items-center hover:scale-110 transition-transform ease-in-out">
        {/* Corner Button */}
        <button 
          className={`rounded-full w-[68px] h-[68px] cursor-pointer transition-all duration-300 ${
            active !== 'none' ? 'mr-[15px] bg-primary-gray' : 'bg-primary-blue '
          }`}
          onClick={() => handleClick("none")}
        >
          <Image
            src={lightningIcon}
            alt="lightning icon"
            className="p-2 w-full h-full transition-transform duration-300 group-hover:rotate-180"
          />
        </button>

        {/* Bridge to Action Buttons */}
        <div 
          className={`absolute z-[-1] right-[34px] h-[100px] bg-transparent hidden group-hover:block ${
            active === 'task' || active === 'inbox' ? 'w-[135px]' : 'w-[195px]'
          }`}
        ></div>

        {/* Action Buttons */}
        <div className="absolute flex items-center top-0 bottom-0 right-[68px] transition-all duration-300">
          <div
            className={`absolute transition-all duration-300 ${
              active === 'task' 
                ? 'right-[-62px] scale-100' 
                : active === 'inbox' 
                ? 'right-[-25px] scale-0 group-hover:scale-100 group-hover:right-[40px]' 
                : 'right-[-42px] scale-0 group-hover:scale-100 group-hover:right-[100px]'
            }`}
          >
            <ActionButton type="task" active={active} onClick={handleClick} />
          </div>
          <div 
            className={`absolute transition-all duration-300 ${
              active === 'inbox' 
                ? 'right-[-62px] scale-100' 
                : active === 'task' 
                ? 'right-[-25px] scale-0 group-hover:scale-100 group-hover:right-[40px]' 
                : 'right-[-42px] scale-0 group-hover:scale-100 group-hover:right-[20px]'
            }`}
          >
            <ActionButton type="inbox" active={active} onClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
}
