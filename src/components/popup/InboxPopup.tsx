// Libs
import { useEffect, useState, useRef } from "react";
import lottie from 'lottie-web';

// Assets
import chatLoadingAnimation from "@/assets/animations/chat-loading.json";

// Components
import InboxSearchBar from "@/components/input/InboxSearchBar";
import ChatList from "@/components/chat/ChatList";

// Hooks
import apiClient from "@/api/apiClient";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { setChats, setLoading, searchChats } from '@/redux/reducers/chatSlice';

// Interface
interface InboxPopupProps {
  isActive?: boolean;
}


export default function InboxPopup(props: InboxPopupProps) {
  // Props
  const { isActive } = props;

  // Lottie Configuration
  const chatLoadingAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: chatLoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  // States
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user.value);
  const { data, filteredData, loading } = useAppSelector((state) => state.chat.value);
  const [searchTerm, setSearchTerm] = useState("");
  const animationContainerRef = useRef<HTMLDivElement>(null);

  // Hooks
  useEffect(() => {
    if (isActive && userState.id) {
      if (!loading && data.length === 0) {
        const fetchChats = async () => {
          dispatch(setLoading(true));
          try {
            const response = await apiClient.get('/chats/' + userState.id);
            if (response.status === 200 && response.data.status === 'success') {
              dispatch(setChats(response.data.data));
            } else {
              dispatch(setChats([]));
            }
          } catch (error) {
            dispatch(setChats([]));
            console.error(error);
          } finally {
            dispatch(setLoading(false));
          }
        };
  
        fetchChats();
      }
    }
  }, [isActive, userState.id, dispatch, data.length]);

  useEffect(() => {
    const container = animationContainerRef.current;

    if (loading && container) {
      lottie.loadAnimation({
        ...chatLoadingAnimationOptions,
        container,
      });
    }
  }, [loading]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    dispatch(searchChats(term));
  };


  return (
    <div className="relative bg-white h-full w-full rounded-lg flex flex-col items-center">
      {/* Search Bar */}
      <div className="w-[90%] mt-8 mb-2">
        <InboxSearchBar value={searchTerm} onChange={handleSearchChange} />
      </div>

      {/* Chat List */}
      <div className={`w-full relative ${loading || data.length === 0 ? 'flex flex-col justify-center items-center h-full' :''} overflow-y-auto scrollbar-thin scrollbar-thumb-primary-black scrollbar-track-white`}>
        {loading ? (
          <div ref={animationContainerRef} className="w-[30%] h-[30%]"></div>
        ) : data.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[30%] w-[30%]">
            <p className="text-primary-black text-lg font-bold">No Chat Found</p>
          </div>
        ) : (
          filteredData.map((chat) => (
            <div key={chat.id} className="relative flex justify-center">
              <ChatList chat={chat} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}