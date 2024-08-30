/* eslint-disable react-hooks/exhaustive-deps */
// Libs
import { useEffect, useState, useRef } from "react";
import lottie from 'lottie-web';
import Image from 'next/image';

// Assets
import chatLoadingAnimation from "@/assets/animations/chat-loading.json";
import ExitIcon from "@/assets/icons/exit-ic";
import LeftArrowIcon from "@/assets/icons/left-arrow-ic";
import loadingAnimation from "@/assets/animations/spinner-loading.json";

// Components
import Button from "@/components/button/Button";
import MessageList from "@/components/chat/MessageList";

// Hooks
import apiClient from "@/api/apiClient";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { setLastMessage } from "@/redux/reducers/chatSlice";

// Interface
import Message from "@/interfaces/message";
import Chat from "@/interfaces/chat";
import { set } from "date-fns";
interface ChatPopupProps {
  chat: Chat | null;
  onClose: () => void;
}

export default function ChatPopup(props: ChatPopupProps) {
  // Props
  const { chat, onClose } = props;

  // Lottie Configuration
  const chatLoadingAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: chatLoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  const loadingAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  // States
  const animationContainerRef = useRef<HTMLDivElement>(null);
  const animationChatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user.value);
  const [data, setData] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const [isChanged, setIsChangedState] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");
  const [unreadIndex, setUnreadIndex] = useState(-1);
  const [onReply, setOnReply] = useState<{ id: String, name: string, message: string } | null>(null);

  // Hooks
  useEffect(() => {
    const fetchMessages = async () => {
      if (!chat || !chat.id || !userState.id) return;

      setLoading(true);

      try {
        const response = await apiClient.get(`/messages/${chat.id}`);
        if (response.status === 200 && response.data.status === 'success') {
          setData(response.data.data);
          setUnreadIndex(findFirstUnread(response.data.data));
        } else {
          setData([]);
        }
      } catch (error) {
        setData([]);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chat, userState.id, dispatch]);

  const readMessages = async () => {
    if (!chat || !userState.id) return;

    try {
      const response = await apiClient.put(`/messages/${chat.id}/read/${userState.id}`);
      if (response.status === 200 && response.data.status === 'success') {
        dispatch(setLastMessage(response.data.data.lastMessage));
      } else {
        console.log("Failed to read messages");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    readMessages();
    onClose();
    setOnReply(null);
  }

  useEffect(() => {
    const container = animationContainerRef.current;

    if (container) {
      container.innerHTML = '';
    }

    if (loading && container) {
      lottie.loadAnimation({
        ...chatLoadingAnimationOptions,
        container,
      });
    }
  }, [loading]);

  useEffect(() => {
      const container = animationChatContainerRef.current;

      if (container) {
        container.innerHTML = '';
      }

      if (sendLoading && container) {
        lottie.loadAnimation({
          ...loadingAnimationOptions,
          container,
        });
      }
  }, [sendLoading]);

  useEffect(() => {
    if (data.length > 0) {
      messagesEndRef.current?.scrollIntoView({});
    }
  }, [data]);

  const sendMessage = async () => {
    if (message === "" || !chat || !userState.id) return;
  
    setSendLoading(true);
    const tempOnReply = onReply;
  
    try {
      const newMessageData = {
        content: message,
        repliedTo: tempOnReply ? tempOnReply.id : null
      };
  
      const response = await apiClient.post('/messages/' + userState.id + '/' + chat?.id, newMessageData);
  
      if (response.status === 201 && response.data.status === 'success') {
        dispatch(setLastMessage(response.data.data.lastMessage));
        setData([...data, response.data.data.lastMessage]);
        console.log("Message sent");
      } else {
        console.log("Failed to send message");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setMessage("");
      setSendLoading(false);
      setOnReply(null);
    }
  };
  

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return date1.toDateString() === date2.toDateString();
  };

  const parseDate = (date: string): string => {
    const newDate = new Date(date);

    const day = newDate.getDate();
    const month = newDate.toLocaleString('default', { month: 'long' });
    const year = newDate.getFullYear();

    if (isSameDay(new Date(), newDate)) {
      return `Today, ${month} ${day}, ${year}`;
    }

    return `${month} ${day}, ${year}`;
  }

  const findFirstUnread = (messages: Message[]): number => {
    for (let i = 0; i < messages.length; i++) {
      const isRead = messages[i].readBy.some(reader => reader.id === userState.id);
      if (!isRead && messages[i].user.id !== userState.id) {
        return i;
      }
    }
  
    return -1;
  };

  return (
    <div className="relative bg-white h-full w-full rounded-lg flex flex-col justify-between">
      {/* Navigation Bar */}
      <div className="flex h-[90px] justify-between bg-white shadow-md">
        <div className="w-[70px] flex justify-center items-center">
          <button className="p-3 hover:scale-110 transition-all duration-300" onClick={handleClose}>
            <LeftArrowIcon width={20} height={20} fillColor="#000" />
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          {
            chat && (
              <div className="h-full justify-center flex flex-col">
                <h1 className="text-primary-blue lato-bold text-xl truncate">{chat.name}</h1>
                {chat.participants.length > 2 && (
                  <p className="text-primary-black lato-regular text-md">{chat.participants.length} Participants</p>
                )}
              </div>
            )
          }
        </div>
        <div className="w-[25px] flex justify-center items-center">
          {/* <button className="p-3 hover:scale-110 transition-all duration-300" onClick={handleClose}>
            <ExitIcon width={20} height={20} fillColor="#000"/>
          </button> */}
        </div>
      </div>
      
      {/* Chat Content */}
     <div className={`w-full flex-1 relative ${loading || data.length === 0 ? 'flex flex-col justify-center items-center flex-1' : ''} overflow-y-auto scrollbar-thin scrollbar-thumb-primary-black scrollbar-track-white`}>
        {loading ? (
          <div ref={animationContainerRef} className="w-[30%] h-[30%]"></div>
        ) : data.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[30%] w-[30%]">
            <p className="text-primary-black text-lg font-bold">No Chat Found</p>
          </div>
        ) : (
          <>
            {data.map((message, index) => {
              const showDateSeparator =
                index === 0 ||
                !isSameDay(new Date(data[index - 1].createdAt), new Date(message.createdAt));

              return (
                <div key={message.id} className="relative flex first:mt-5 last:mb-[20px]">
                  <div className="w-full relative">
                    {showDateSeparator && (
                      <div className="relative text-center text-primary-black lato-bold text-lg py-2">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-primary-black mx-8"></div>
                        </div>
                        <span className="relative z-10 bg-white px-5">
                          {parseDate(message.createdAt)}
                        </span>
                      </div>
                    )}
                    {unreadIndex === index && (
                      <div className="relative text-center text-indicator-red lato-bold text-lg py-2">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-indicator-red mx-8"></div>
                          </div>
                          <span className="relative z-10 bg-white px-5">
                            Unread Messages
                            </span>
                            </div>
                            )}
                    {/* Message List */}
                    <MessageList message={message} onChange={(type) => setIsChangedState(type)} onReply={(id, name, message) => setOnReply({ id, name, message })} />
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Chat Input */}
      <div className="flex items-end justify-center shadow-md border-t-2 relative h-[90px] pb-[22px]">

        {/* Loading */}
        {sendLoading && 
          <div className="absolute flex items-center border-[1px] border-primary-gray bg-stickers-100 top-[-60px] w-[92%] h-16 rounded-lg lato-regular">
            <div className="mx-5 mr-8 w-[40px] h-[40px] z-50" ref={animationChatContainerRef}></div>
            <p>
              Please wait while we send your message...
            </p>
          </div>
        }

        <div className="relative w-full min-h-full mx-5 justify-end flex flex-col">
          <div className={`flex flex-col`}>
            {/* Reply */}
            {onReply && 
              <div className="z-50 flex justify-between border-[2px] pl-5 py-3 border-primary-gray bg-primary-white rounded-t-lg lato-regular mb-[-6px]">
                <div>
                  <p className="text-black lato-bold text-md">
                    Replying to {onReply.name}
                  </p>
                  <p className="leading-5 text-black lato-regular text-md">
                    {onReply.message}
                  </p>
                </div>
                <button className="mr-4 flex items-start" onClick={() => setOnReply(null)}>
                  <ExitIcon width={14} height={14} fillColor="#000" />
                </button>
              </div>
            }

            {/* Input */}
            <input 
              type="text" 
              placeholder="Type a new message"
              className="w-full bg-white px-3 py-[9px] border-2 border-primary-gray rounded-lg lato-regular focus:outline-none" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
          </div>
        </div>
        <div className="mr-5">
          <div className="hidden sm:block">
            <Button width="100" onClick={() => sendMessage()}>
              Send
            </Button>
          </div>
          <div className="block sm:hidden">
            <Button width="70" onClick={() => sendMessage()}>
              &gt;
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
