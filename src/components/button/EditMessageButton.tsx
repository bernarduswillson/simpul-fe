// Libs
import Image from "next/image";

// Assets
import kebabMenuIcon from "@/assets/icons/kebab-menu-ic.svg";

// Components
import FlyoutLink from "@/components/dialogue/FlyoutLink";

// Interface
interface EditMessageButtonProps {
  type?: string
  isUser?: boolean
  onClick?: (type: string) => void;
}


export default function EditMessageButton(props: EditMessageButtonProps) {
  // Props
  const { type = "left", isUser, onClick } = props;

  
  return (
    <FlyoutLink FlyoutContent={EditMessageFlyout} type={type} isUser={isUser} onClick={onClick}>
      <button className="py-2 px-2">
        <Image src={kebabMenuIcon} alt="Kebab Menu Icon" />
      </button>
    </FlyoutLink>
  );
};


// Interface
interface EditMessageFlyoutProps {
  type?: string
  isUser?: boolean
  onClick?: (type: string) => void;
}


const EditMessageFlyout = (props: EditMessageFlyoutProps) => {
  // Props
  const { type, isUser, onClick } = props;


  return (
    <div className={`bg-white border-[1px] rounded-lg shadow-md absolute w-[120px] ${type === "right" ? 'left-[15px]' : 'left-[-135px]'} top-[-80px] lato-bold overflow-hidden`}>
      { isUser ? (
      <div className="">
        <button 
          className="border-b-[1px] w-[120px] px-5 py-1 bg-white text-primary-blue text-start hover:bg-primary-blue hover:text-white transition-all duration-200"
          onClick={() => onClick && onClick("edit")}
        >
          Edit
        </button>
        <button 
          className="w-[120px] px-5 py-1 bg-white text-indicator-red text-start hover:bg-indicator-red hover:text-white transition-all duration-200"
          onClick={() => onClick && onClick("delete")}
        >
          Delete
        </button>
      </div>
      ) : (
      <div className="">
        <button 
          className="w-[120px] px-5 py-1 bg-white text-primary-blue text-start hover:bg-primary-blue hover:text-white transition-all duration-200"
          onClick={() => onClick && onClick("reply")}
        >
          Reply
        </button>
      </div>
      )
    }
    </div>
  );
};
