// Libs
import { useEffect, useState } from "react";

// Components
import EditMessageButton from "@/components/button/EditMessageButton";
import Button from "@/components/button/Button";
import Modal from "@/components/dialogue/Modal";

// Hooks
import apiClient from "@/api/apiClient";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { setLastMessage } from "@/redux/reducers/chatSlice";

// Utils
import { dateToTime } from "@/utils/date";
import { hashCode, intToBubbleColor, intToNameColor } from "@/utils/colors";

// Interface
import Message from "@/interfaces/message";

interface MessageListProps {
  message: Message;
  onReply?: (id: string, name: string, message: string) => void;
}


export default function MessageList(props: MessageListProps) {
  // Props
  const { message, onReply } = props;

  // States
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user.value);
  const isCurrentUser = message.user.id === userState.id;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message.content);
  const userBubbleColor = intToBubbleColor(hashCode(message.user.id));
  const userNameColor = intToNameColor(hashCode(message.user.id));

  // Handlers
  const handleEditMessageButton = async(type: string) => {
    if (type === "edit") {
      setIsEditModalOpen(true);
    } else if (type === "delete") {
      setIsDeleteModalOpen(true);
    } else if (type === "reply") {
      onReply && onReply(message.id, message.user.name, message.content);
    }
  }

  const handleEditMessage = async () => {
    if (editedMessage === message.content) {
      setIsEditModalOpen(false);
      return;
    }
    
    // setLoading(true);
    setIsEditModalOpen(false);
    try {
      const updatedMessageData = {
        content: editedMessage,
      };
  
      const response = await apiClient.put(`/messages/${message.id}`, updatedMessageData);
      if (response.status === 200 && response.data.status === 'success') {
        dispatch(setLastMessage(response.data.data.lastMessage));
        console.log("Message edited");
      } else {
        console.log("Failed to edit message");
      }
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  };

  const handleDeleteMessage = async () => {
    // setLoading(true);
    setIsDeleteModalOpen(false);
    try {
      const response = await apiClient.delete(`/messages/${message.id}`);
      if (response.status === 200 && response.data.status === 'success') {
        dispatch(setLastMessage(response.data.data.lastMessage));
        console.log("Message deleted");
      } else {
        console.log("Failed to delete message");
      }
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  }


  return (
    <div
      className={`flex flex-col pb-4 overflow-hidden w-full px-8 ${
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

      {/* Reply */}
      { message.repliedTo && message.repliedTo.content &&
        <div className={`flex items-center bg-primary-white rounded-lg px-4 pt-2 pb-3 mb-2 max-w-md ${isCurrentUser ? 'ml-3' : 'mr-3'}`}>
          <p className="leading-5 text-black lato-regular sm:text-lg text-md">
            {message.repliedTo.content}
          </p>
        </div>
      }

      {/* Message */}
      <div className="flex relative">
        {isCurrentUser && 
          <div className="absolute top-0 left-[-8px] w-7 h-7 flex justify-center items-center">
            <EditMessageButton type="right" isUser={isCurrentUser} onClick={(type) => handleEditMessageButton(type)} />
          </div>
        }
        <div
          className={`max-w-xs px-4 py-2 rounded-lg text-black lato-regular sm:text-lg text-md ${isCurrentUser ? 'ml-5' : 'mr-5'}`}
          style={{ backgroundColor: !isCurrentUser ? userBubbleColor : "#EEDCFF" }}
        >

          <p className="leading-5">{message.content}</p>
          <div className="flex">
            <p className="text-sm mt-2">{dateToTime(message.createdAt)}</p>
            <p className={`${message.isUpdated ? 'block' : 'hidden'} text-sm mt-2 ml-1`}>(Edited)</p>
          </div>
        </div>
        {!isCurrentUser && 
          <div className="absolute top-0 right-[-8px] w-7 h-7 flex justify-center items-center">
            <div className="hidden sm:block">
              <EditMessageButton type="right" isUser={isCurrentUser} onClick={(type) => handleEditMessageButton(type)} />
            </div>
            <div className="sm:hidden block">
              <EditMessageButton type="left" isUser={isCurrentUser} onClick={(type) => handleEditMessageButton(type)} />
            </div>
          </div>
        }
      </div>

      {/* Edit Modal */}
      <Modal onClose={() => setIsEditModalOpen(false)} isOpen={isEditModalOpen}>
        <h2 className="mb-3 text-black lato-bold header-3 text-center">
          Edit
        </h2>
        <input
          type="text"
          className="w-full border-2 border-primary-gray rounded-lg px-3 py-2 lato-regular focus:outline-none mb-7"
          value={editedMessage}
          onChange={(e) => setEditedMessage(e.target.value)}
        />
        <div>
          <div className='flex gap-7'>
            <Button
              width='120'
              onClick={() => handleEditMessage()}
            >
              Edit
            </Button>
            <Button
              variant="secondary"
              width='120'
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal onClose={() => setIsDeleteModalOpen(false)} isOpen={isDeleteModalOpen}>
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
              width='120'
              onClick={() => handleDeleteMessage()}
            >
              Delete
            </Button>
            <Button
              variant="secondary"
              width='120'
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
