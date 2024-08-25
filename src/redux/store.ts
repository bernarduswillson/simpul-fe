// Libs
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

// Reducers
import userReducers from "@/redux/reducers/userSlice";
import chatReducers from "@/redux/reducers/chatSlice";


export const store = configureStore({
  reducer: {
    user: userReducers,
    chat: chatReducers,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware( { serializableCheck: false } 
  ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;