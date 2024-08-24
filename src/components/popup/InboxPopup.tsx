// Libs
import { useEffect } from "react";
import axios from "axios";

// Api
import apiClient from "@/api/apiClient";

export default function InboxPopup() {
  // Hooks
  useEffect(() => {
    fetchChats();
    return () => {
    };
  }, []);

  // Fetch chats using axios
  const fetchChats = async () => {
    try {
      const response = await apiClient.get('/chats/1');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative bg-white h-full w-full rounded-lg flex items-center justify-center">
      INBOX
    </div>
  );
}
