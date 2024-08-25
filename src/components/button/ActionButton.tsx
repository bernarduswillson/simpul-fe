// Libs
import Image from "next/image";

// Assets
import TaskIcon from "@/assets/icons/task-ic";
import InboxIcon from "@/assets/icons/inbox-ic";

// Interface
interface ActionButtonProps {
  type: "task" | "inbox";
  active: "task" | "inbox" | "none";
  onClick?: (clicked: "task" | "inbox" | "none") => void;
}


export default function ActionButton(props: ActionButtonProps) {
  // Props
  const { type, active, onClick } = props;

  // Handlers
  const handleClick = (clicked: "task" | "inbox") => {
    if (active === clicked) {
      onClick?.("none");
    } else {
      onClick?.(clicked);
    }
  }

  return (
    <div className="relative">
      <button
        className={`rounded-full flex items-center justify-center w-[62px] h-[62px] hover:scale-110 transition-all ease-in-out cursor-pointer
          ${type === "task" ? (active === "task" ? "bg-indicator-yellow" : "bg-white") : ""}
          ${type === "inbox" ? (active === "inbox" ? "bg-indicator-purple" : "bg-white") : ""}
          ${active === type ? "scale-110" : ""}
        `}
        onClick={() => handleClick(type)}
      >
        {/* Label */}
        <p className={`absolute h-[50px] top-[-30px] left-0 right-0 text-center lato-bold text-white text-md transition-all duration-300 ${type === active || active !== 'none' ? 'opacity-0' : 'opacity-100'}`}>
          {type === "task" ? "Task" : "Inbox"}
        </p>

        {/* Icon */}
        {type === "task" ? (
          <TaskIcon width={30} height={30} fillColor={active === type ? "#FFFFFF" : "#F2C94C"} />
        ) : (
          <InboxIcon width={30} height={30} fillColor={active === type ? "#FFFFFF" : "#8885FF"} />
        )}
      </button>
    </div>
  );
}
