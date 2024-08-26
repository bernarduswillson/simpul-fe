// Components

// Hooks
import { useAppSelector } from "@/redux/store";

// Interface
import Message from "@/interfaces/message";

interface MessageListProps {
  message: Message;
  onClick?: (id: string) => void;
}

export default function MessageList(props: MessageListProps) {
  // Props
  const { message, onClick } = props;

  // States
  const userState = useAppSelector((state) => state.user.value);
  const isCurrentUser = message.user.id === userState.id;

  // Parse date
  const parseTime = (date: string): string => {
    const newDate = new Date(date);
  
    const hours = String(newDate.getHours()).padStart(2, '0');
    const minutes = String(newDate.getMinutes()).padStart(2, '0');
  
    return `${hours}:${minutes}`;
  }

  // Generate colors
  const hashCode = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char * 77;
    }
    return hash;
  };
  
  const intToBubbleColor = (int: number) => {
    const hue = Math.abs(int % 360);
    const saturation = 30 + (Math.abs(int % 20));
    const lightness = 80 + (Math.abs(int % 20) - 10); 
    
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const intToNameColor = (int: number) => {
    const hue = Math.abs(int % 360);
    const saturation = 70 + (Math.abs(int % 20));
    const lightness = 50 + (Math.abs(int % 20) - 10); 
    
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const userBubbleColor = intToBubbleColor(hashCode(message.user.id));
  const userNameColor = intToNameColor(hashCode(message.user.id));

  return (
    <div
      className={`flex flex-col mb-2 w-full px-8 ${
        isCurrentUser ? "items-end" : "items-start"
      }`}
    >
      {/* Name */}
      {!isCurrentUser ? (
        <p
          className=' lato-bold text-lg'
          style={{ color: userNameColor }}
        >
          {message.user.name}
        </p>
      ) : (
        <p className="text-chats-purple lato-bold text-lg ml-2">You</p>
      )}

      {/* Message */}
      <div
        className={`max-w-xs px-4 py-2 rounded-lg text-black lato-regular sm:text-lg text-md ${isCurrentUser ? 'ml-5' : 'mr-5'}`}
        style={{ backgroundColor: !isCurrentUser ? userBubbleColor : "#EEDCFF" }}
      >
        <p className="leading-5">{message.content}</p>
        <p className="text-sm mt-2">{parseTime(message.createdAt)}</p>
      </div>
    </div>
  );
}
