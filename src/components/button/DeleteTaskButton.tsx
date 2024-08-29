// Libs
import Image from "next/image";

// Assets
import kebabMenuIcon from "@/assets/icons/kebab-menu-ic.svg";

// Components
import FlyoutLink from "@/components/dialogue/FlyoutLink";

// Interface
interface DeleteTaskButtonProps {
  onClick?: (type: "edit" | "delete") => void;
}

export default function DeleteTaskButton(props: DeleteTaskButtonProps) {
  // Props
  const { onClick } = props;

  return (
    <FlyoutLink FlyoutContent={DeleteTaskFlyout} onClick={onClick}>
      <button className="py-2 px-2">
        <Image src={kebabMenuIcon} alt="Kebab Menu Icon" />
      </button>
    </FlyoutLink>
  );
};

// Interface
interface DeleteTaskFlyoutProps {
  onClick?: (type: "edit" | "delete") => void;
}

const DeleteTaskFlyout = (props: DeleteTaskFlyoutProps) => {
  // Props
  const { onClick } = props;

  return (
    <div className={`bg-white border-[1px] rounded-lg shadow-md absolute w-[120px] left-[-115px] top-[-60px] lato-bold overflow-hidden`}>
      <button 
        className="w-[120px] px-5 py-2 bg-white text-indicator-red text-start hover:bg-indicator-red hover:text-white transition-all duration-200"
        onClick={() => onClick && onClick("delete")}
      >
        Delete
      </button>
    </div>
  );
};
