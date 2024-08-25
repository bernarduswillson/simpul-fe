// Components
import ChatProfileImage from "@/components/profile/ChatProfileImage";

// Hooks
import { useAppSelector } from "@/redux/store";

// Interface
import Chat from "@/interfaces/chat";


export default function ChatList({ chat }: { chat: Chat }) {
  // States
  const userState = useAppSelector((state) => state.user.value);

  const parseDate = (date: string): string => {
    const newDate = new Date(date);
  
    const day = String(newDate.getDate()).padStart(2, '0');
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const year = newDate.getFullYear();
  
    return `${day}/${month}/${year}`;
  }

  const parseTime = (date: string): string => {
    const newDate = new Date(date);
  
    const hours = String(newDate.getHours()).padStart(2, '0');
    const minutes = String(newDate.getMinutes()).padStart(2, '0');
  
    return `${hours}:${minutes}`;
  }

  return (
    <button className="flex gap-2 md:gap-5 w-[90%] relative items-center justify-between border-b border-primary-gray py-3 pb-8">
      {/* Profile Image */}
      <div className="h-full mt-2">
        <ChatProfileImage participants={chat.participants} />
      </div>

      {/* Chat Content */}
      <div className="flex-1 min-w-0 text-start">
        <h1 className="text-primary-blue lato-bold text-lg">{chat.name}</h1>
        {chat.participants.length > 2 && (
          <p className="text-primary-black lato-bold text-md">{chat.lastMessage.user.name} :</p>
        )}
        <div className="w-full overflow-hidden">
          <p className="text-primary-black lato-regular text-md truncate">{chat.lastMessage.content}</p>
        </div>
      </div>

      <div className="text-end flex-shrink-0 h-full">
        {/* Date */}
        <div className="hidden md:block">
          <p className="text-primary-black text-sm">{parseDate(chat.lastMessage.createdAt)} {parseTime(chat.lastMessage.createdAt)}</p>
        </div>
        <div className="block md:hidden">
          <p className="text-primary-black text-sm">{parseDate(chat.lastMessage.createdAt)} <br/> {parseTime(chat.lastMessage.createdAt)}</p>
        </div>

        {/* Notification */}
        {chat.lastMessage.readBy.filter((participant) => participant.id === userState.id).length === 0 && userState.id !== chat.lastMessage.user.id && (
          <div className="absolute bottom-[17px] right-0 w-2 h-2 rounded-full bg-indicator-red"></div>
        )}
      </div>
    </button>
  );
}
