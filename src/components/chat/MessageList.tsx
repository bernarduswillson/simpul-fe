// Libs
import { useEffect, useState } from "react";

// Components
import EditMessageButton from "@/components/button/EditMessageButton";
import Button from "@/components/button/Button";
import Modal from "@/components/dialogue/WarningModal";

// Hooks
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { setLastMessage } from "@/redux/reducers/chatSlice";

// Api
import apiClient from "@/api/apiClient";

// Interface
import Message from "@/interfaces/message";

interface MessageListProps {
  message: Message;
  onChange?: (isChanged: boolean) => void;
}

export default function MessageList(props: MessageListProps) {
  // Props
  const { message, onChange } = props;

  // States
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user.value);
  const isCurrentUser = message.user.id === userState.id;
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditMessageButton = async (type: "edit" | "delete") => {
    // setLoading(true);
    try {
      if (type === "edit") {
        console.log("Edit message");
      } else {
        setIsModalOpen(true);
        // const response = await apiClient.delete(`/messages/${message.id}`);
        // if (response.status === 200 && response.data.status === 'success') {
        //   dispatch(setLastMessage(response.data.data.lastMessage));
        //   console.log("Message deleted");
        //   onChange && onChange(true);
        // } else {
        //   console.log("Failed to delete message");
        // }
      }
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    } 
  }

  const handleDeleteMessage = async () => {
    // setLoading(true);
    setIsModalOpen(false);
    try {
      const response = await apiClient.delete(`/messages/${message.id}`);
      if (response.status === 200 && response.data.status === 'success') {
        dispatch(setLastMessage(response.data.data.lastMessage));
        console.log("Message deleted");
        onChange && onChange(true);
      } else {
        console.log("Failed to delete message");
      }
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  }

  useEffect(() => {
    return () => {
      // setLoading(false);
    }
  }, []);

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
      className={`flex flex-col pb-5 overflow-hidden w-full px-8 ${
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
      <div className="flex relative">
        {isCurrentUser && 
          <div className="absolute top-0 left-[-8px] w-7 h-7 flex justify-center items-center">
            <EditMessageButton type="right" onClick={(type) => handleEditMessageButton(type)} />
          </div>
        }
        <div
          className={`max-w-xs px-4 py-2 rounded-lg text-black lato-regular sm:text-lg text-md ${isCurrentUser ? 'ml-5' : 'mr-5'}`}
          style={{ backgroundColor: !isCurrentUser ? userBubbleColor : "#EEDCFF" }}
        >
          <p className="leading-5">{message.content}</p>
          <p className="text-sm mt-2">{parseTime(message.createdAt)}</p>
        </div>
        {!isCurrentUser && 
          <div className="absolute top-0 right-[-8px] w-7 h-7 flex justify-center items-center">
            <div className="hidden sm:block">
              <EditMessageButton type="right" onClick={(type) => handleEditMessageButton(type)} />
            </div>
            <div className="sm:hidden block">
              <EditMessageButton type="left" onClick={(type) => handleEditMessageButton(type)} />
            </div>
          </div>
        }
      </div>

      {/* Modal */}
      <Modal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
        <h2 className="mb-1 text-black lato-bold header-3 text-center">
          Delete
        </h2>
        <p className="mb-7 text-gray-500 lato-regular body-m text-center">
          Are you sure you want to delete this message?
        </p>
        <div>
          <div className='flex gap-7'>
            <Button
            variant="warning"
              width='150'
              onClick={() => handleDeleteMessage()}
            >
              Delete
            </Button>
            <Button
              variant="secondary"
              width='150'
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
