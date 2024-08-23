// Libs
import Image from "next/image";

// Assets
import lightningIcon from "@/assets/icons/lightning-ic.svg";

// Components
import ActionButton from "./ActionButton";


// Interface
interface CornerButtonProps {
  onClick?: (message: string) => void;
}

export default function CornerButton(props: CornerButtonProps) {
  const { onClick } = props;

  const handleClick = (message: string) => {
    if (onClick) {
      onClick(message);
    }
  };

  return (
    <div className="relative group">
      <div className="relative flex items-center hover:scale-110 transition-transform ease-in-out cursor-pointer">
        {/* Corner Button */}
        <button className="bg-primary-blue rounded-full w-[68px] h-[68px]">
          <Image
            src={lightningIcon}
            alt="lightning icon"
            className="p-2 w-full h-full"
          />
        </button>

        {/* Action Buttons */}
        <div className="absolute flex items-center top-0 bottom-0 right-[-20px] px-5 gap-5 transform scale-0 group-hover:scale-100 group-hover:right-[68px] transition-all duration-300">
          <ActionButton type="task" onClick={handleClick} />
          <ActionButton type="inbox" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
}
