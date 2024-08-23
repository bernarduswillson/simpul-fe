// Libs
import Image from "next/image";

// Assets
import TaskIcon from "@/assets/icons/task-ic";
import InboxIcon from "@/assets/icons/inbox-ic";


// Interface
interface ActionButtonProps {
  type: "task" | "inbox";
  onClick?: (message: string) => void;
}

export default function ActionButton(props: ActionButtonProps) {
  const { type, onClick } = props;
  const message = type === "task" ? "Task button clicked" : "Inbox button clicked";

  return (
    <div className="relative">
      <button
        className="bg-white rounded-full flex items-center justify-center w-[60px] h-[60px] hover:scale-110 transition-all ease-in-out cursor-pointer"
        onClick={() => onClick?.(message)}
      >
        {/* Label */}
        <p className="absolute top-[-30px] left-0 right-0 text-center lato-bold text-white text-md">
          {type === "task" ? "Task" : "Inbox"}
        </p>

        {/* Icon */}
        {type === "task" ? (
          <TaskIcon width={30} height={30} fillColor="#F8B76B" />
        ) : (
          <InboxIcon width={30} height={30} fillColor="#8885FF" />
        )}
      </button>
    </div>
  );
}
