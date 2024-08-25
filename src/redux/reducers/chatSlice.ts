// Libs
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";

// Interface
import Chat from "@/interfaces/chat";

interface ChatState {
  data: Chat[];
  filteredData: Chat[];
  loading: boolean;
}

// Initial values
const initialValues: ChatState = {
  data: [],
  filteredData: [],
  loading: false,
};


export const chatSlice = createSlice({
  name: 'chat',
  initialState: { value: initialValues },
  reducers: {
    // Set Chats
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.value.data = action.payload;

      // sort chats
      state.value.data.sort((a, b) => {
        const dateA = new Date(a.lastMessage.createdAt);
        const dateB = new Date(b.lastMessage.createdAt);
        return dateB.getTime() - dateA.getTime();
      });

      state.value.filteredData = state.value.data;

      state.value.loading = false;
    },

    // Set Loading
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.value.loading = action.payload;
    },

    // Search Chats
    searchChats: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.toLowerCase();
      state.value.filteredData = state.value.data.filter((chat) =>
        chat.name.toLowerCase().includes(searchTerm)
      );
    },
  },
});

export const { setChats, setLoading, searchChats } = chatSlice.actions;
export default chatSlice.reducer;
