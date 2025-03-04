/* eslint-disable react-hooks/exhaustive-deps */
// Libs
import { useEffect, useState, useRef } from "react";
import lottie from 'lottie-web';

// Components
import InboxSearchBar from "@/components/input/InboxSearchBar";
import ChatList from "@/components/list/ChatList";
import ChatPopup from "@/components/popup/ChatPopup";

// Hooks
import apiClient from "@/api/apiClient";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { setChats, setLoading, searchChats } from '@/redux/reducers/chatSlice';

// Utils
import { chatLoadingAnimationOptions } from "@/utils/lottie";

// Interface
interface InboxPopupProps {
  isActive?: boolean;
}


export default function InboxPopup(props: InboxPopupProps) {
  // Props
  const { isActive } = props;

  // States
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user.value);
  const { data, filteredData, loading } = useAppSelector((state) => state.chat.value);
  const [searchTerm, setSearchTerm] = useState("");
  const [clickedChat, setClickedChat] = useState<string | null>(null);
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
              // console.log(response.data.data);
              dispatch(setChats(response.data.data));
              // dispatch(setChats([...response.data.data, ...response.data.data, ...response.data.data]));
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

  
  // Handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    dispatch(searchChats(term));
  };
  
  
  if (!isActive) return null;
  return (
    <div className="relative bg-white h-full w-full rounded-lg flex flex-col items-center overflow-hidden">
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
            <div key={chat.id} className="relative flex justify-center last:pb-2">
              <ChatList chat={chat} onClick={(id) => setClickedChat(id)} />
            </div>
          ))
        )}
      </div>

      {/* Chat Popup */}
      <div
        className={`absolute z-50 w-full h-full transition-all duration-300 ease-in-out ${
          clickedChat ? 'top-0 left-0' : 'left-full'
        }`}
      >
        <ChatPopup
          chat={data.find((chat) => chat.id === clickedChat) ?? null}
          onClose={() => setClickedChat(null)}
        />
      </div>
    </div>
  );
}