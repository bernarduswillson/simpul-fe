// Libs
import Image from "next/image";

// Assets
import chevronDownIcon from "@/assets/icons/chevron-down-ic.svg";

// Components
import FlyoutLink from "@/components/dialogue/FlyoutLink";
import Button from "@/components/button/Button";

// Interface
interface NewTaskButtonProps {
  onClick?: (type: string) => void;
}

export default function NewTaskButton(props: NewTaskButtonProps) {
  // Props
  const { onClick } = props;

  return (
    <div>
      <FlyoutLink FlyoutContent={NewTaskFlyout} onClick={onClick}>
        <Button width="130">New Task</Button>
      </FlyoutLink>
    </div>
  );
};

// Interface
interface NewTaskFlyoutProps {
  onClick?: (type: string) => void;
}

const NewTaskFlyout = (props: NewTaskFlyoutProps) => {
  // Props
  const { onClick } = props;

  return (
    <div className={`bg-white border-[1px] border-primary-gray rounded-lg shadow-md absolute w-[200px] left-[-135px] top-[-30px] lato-bold overflow-hidden`}>
      <button 
        className={`border-b-[1px] border-primary-gray w-[200px] px-5 py-2 bg-white text-black text-start hover:bg-primary-blue hover:text-white transition-all duration-200`}
        onClick={() => onClick && onClick("personal")}
      > 
        Personal Errands
      </button>
      <button 
        className={`border-primary-gray w-[200px] px-5 py-2 bg-white text-black text-start hover:bg-primary-blue hover:text-white transition-all duration-200`}
        onClick={() => onClick && onClick("urgent")}
      >
        Urgent To-Do
      </button>
    </div>
  );
};
