// Libs
import Image from "next/image";

// Assets
import chevronDownIcon from "@/assets/icons/chevron-down.svg";

// Components
import FlyoutLink from "@/components/dialogue/FlyoutLink";

// Interface
interface FilterTaskButtonProps {
  type?: "left" | "right";
  onClick?: (type: "edit" | "delete" | "all" | "personal" | "urgent") => void;
}

export default function EditMessageButton(props: FilterTaskButtonProps) {
  // Props
  const { type = "left", onClick } = props;

  return (
    <div>
      <FlyoutLink FlyoutContent={EditMessageFlyout} type={type} onClick={onClick}>
        <button className="border-2 border-primary-gray rounded-md flex items-center lato-regular px-4 py-2 group hover:translate-y-[3px] transition-all duration-300">
          My Tasks
          <Image
            src={chevronDownIcon}
            alt="Chevron Down Icon"
            width={10}
            height={10}
            className="ml-2 transform group-hover:translate-y-[3px] transition-all duration-1000"
          />
        </button>
      </FlyoutLink>
    </div>
  );
};

// Interface
interface FilterTaskFlyoutProps {
  type?: "left" | "right";
  onClick?: (type: "edit" | "delete" | "all" | "personal" | "urgent") => void;
}

const EditMessageFlyout = (props: FilterTaskFlyoutProps) => {
  // Props
  const { type, onClick } = props;

  return (
    <div className={`bg-white border-[1px] border-primary-gray rounded-lg shadow-md absolute w-[230px] ${type === "right" ? 'left-[-115px]' : 'left-[-115px]'} top-[-30px] lato-bold overflow-hidden`}>
      <button 
        className="border-b-[1px] border-primary-gray w-[230px] px-5 py-2 bg-white text-black text-start hover:bg-primary-blue hover:text-white transition-all duration-200"
        onClick={() => onClick && onClick("all")}
      >
        All
      </button>
      <button 
        className="border-b-[1px] border-primary-gray w-[230px] px-5 py-2 bg-white text-black text-start hover:bg-primary-blue hover:text-white transition-all duration-200"
        onClick={() => onClick && onClick("personal")}
      > 
        Personal Errands
      </button>
      <button 
        className="border-b-[1px] border-primary-gray w-[230px] px-5 py-2 bg-white text-black text-start hover:bg-primary-blue hover:text-white transition-all duration-200"
        onClick={() => onClick && onClick("urgent")}
      >
        Urgent To-Do
      </button>
    </div>
  );
};
