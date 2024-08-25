export default interface Chat {
  id: string;
  name: string;
  isGroup: boolean;
  participants: Array<{ id: string; name: string; photo: string }>;
  lastMessage: {
    user: {
      id: string;
      name: string;
    }
    content: string;
    createdAt: string;
    isUpdated: boolean;
    readBy: Array<{ id: string; name: string }>;
  };
}