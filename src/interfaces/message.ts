export default interface Message {
  id: string;
  user: {
    id: string;
    name: string;
  };
  content: string;
  createdAt: string;
  repliedTo: {
    id: string;
    name: string;
    content: string;
  }
  isUpdated: boolean;
  readBy: Array<{ id: string; name: string }>
}