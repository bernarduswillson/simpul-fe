// Components
import ChatProfileImage from "@/components/profile/ChatProfileImage";

// Hooks
import { useAppSelector } from "@/redux/store";

// Utils
import { dateToTime, formatDate1 } from "@/utils/date";

// Interface
import Chat from "@/interfaces/chat";
interface ChatListProps {
  chat: Chat;
  onClick?: (id: string) => void;
}


export default function ChatList(props: ChatListProps) {
  // Props
  const { chat, onClick } = props;

  // States
  const userState = useAppSelector((state) => state.user.value);

  // Handlers
  const handleClick = (clicked: string) => {
    if (onClick) {
      onClick(clicked);
    }
  }

  return (
    <button 
      key={chat.id}
      className="flex gap-2 md:gap-5 w-[90%] relative items-center justify-between border-b border-primary-gray py-3 pb-8 hover:scale-[1.02] transition-all duration-300"
      onClick={() => {
        handleClick(chat.id);
      }}
    >
      {/* Profile Image */}
      <div className="h-full mt-2">
        <ChatProfileImage participants={chat.participants} />
      </div>

      {/* Chat Content */}
      <div className="flex-1 min-w-0 text-start">
        <h1 className="text-primary-blue lato-bold text-lg">{chat.name}</h1>
        {chat.participants.length > 2 && chat.lastMessage && chat.lastMessage.user && chat.lastMessage.user.name && (
          <p className="text-primary-black lato-bold text-md">{chat.lastMessage.user.name} :</p>
        )}
        <div className="w-full overflow-hidden">
          { chat.lastMessage && (
            <p className="text-primary-black lato-regular text-md truncate">{chat.lastMessage.content}</p>
          )}
        </div>
      </div>

      <div className="text-end flex-shrink-0 h-full">
        {/* Date */}
        { chat.lastMessage && (
          <div>
            <div className="hidden md:block">
              <p className="text-primary-black text-sm">{formatDate1(chat.lastMessage.createdAt)} {dateToTime(chat.lastMessage.createdAt)}</p>
            </div>
            <div className="block md:hidden">
              <p className="text-primary-black text-sm">{formatDate1(chat.lastMessage.createdAt)} <br/> {dateToTime(chat.lastMessage.createdAt)}</p>
            </div>
          </div>
        )}

        {/* Notification */}
        {chat.lastMessage && chat.lastMessage.user &&  chat.lastMessage.user.id && chat.lastMessage.readBy.filter((participant) => participant.id === userState.id).length === 0 && userState.id !== chat.lastMessage.user.id && (
          <div className="absolute bottom-[17px] right-0 w-2 h-2 rounded-full bg-indicator-red"></div>
        )}
      </div>
    </button>
  );
}
