export default interface Task {
  id: string;
  userId: string;
  name: string;
  date: string;
  description: string;
  type: string;
  isDone: boolean;
}